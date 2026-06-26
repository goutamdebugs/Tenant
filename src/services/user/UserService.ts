import { UserRepo } from "../../repository/user/UserRepo";
import { CreateUserDto } from "../../dtos/user/CreateUserDto";
import { UpdateUserDto } from "../../dtos/user/UpdateUserDto";
import { UserFriendlyException } from "../../dtos/common/UserFriendlyException";
import { mapper } from "../../mapper";
import User from "../../db/models/User";
import { RoleRepo } from "../../repository/role/RoleRepo";
import { JwtUtility } from "../../shared/JwtUtility";
import { ResponseUserDto } from "../../dtos/user/ResponseUserDto";
import { signUpDto } from "../../dtos/user/SignUpDto";
import { UserValidator } from "../../validation/UserValidations";
import bcrypt from "bcrypt";
import { createMap } from "@automapper/core";
import { redisClient } from "../../cacse/RedisClient";
// import Role from "../../db/models/Role";

export class UserService {
  // Enforcing Dependency Injection
  constructor(
    private userRepo: UserRepo = new UserRepo(),
    private roleRepo: RoleRepo = new RoleRepo()
  ) { }

  /**
   * Create a new user
   */
  public async createUser(data: CreateUserDto): Promise<ResponseUserDto> {
    // Validation
    try {
      UserValidator.validateSignUp(data);
    } catch (validation: any) {
      throw new UserFriendlyException(validation.message, 400);
    }

    // Check if email already exists
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new UserFriendlyException(`User with email "${data.email}" already exists`, 409);
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // Create user with hashed password
    const userData = {
      ...data,
      password: hashedPassword
    };

    const newUser = await this.userRepo.create(userData);
    return mapper.map(newUser, User, ResponseUserDto) as ResponseUserDto;
  }

  /**
   * Get all users
   */
  public async getAllUsers(): Promise<ResponseUserDto[]> {
    const rawUsers = await this.userRepo.findAll();
    return mapper.mapArray(rawUsers, User, ResponseUserDto);
  }

  /**
   * Get user by ID
   */
  public async getUserById(id: number): Promise<ResponseUserDto> {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid user ID", 400);
    }

    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new UserFriendlyException(`User with ID ${id} not found`, 404);
    }

    return mapper.map(user, User, ResponseUserDto) as ResponseUserDto;
  }

  /**
   * Update user
   */
  public async updateUser(id: number, data: UpdateUserDto): Promise<ResponseUserDto> {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid user ID", 400);
    }

    // Check if at least one field is provided
    if (!data.name && !data.surname && !data.email && !data.password) {
      throw new UserFriendlyException("At least one field (name, surname, email, or password) is required", 400);
    }

    // Check if user exists
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new UserFriendlyException(`User with ID ${id} not found`, 404);
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepo.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new UserFriendlyException(`User with email "${data.email}" already exists`, 409);
      }
    }

    // Hash password if it's being updated
    if (data.password) {
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }

    const updated = await this.userRepo.update(id, data);
    if (!updated) {
      throw new UserFriendlyException("Failed to update user", 500);
    }

    // Fetch and return updated user
    const updatedUser = await this.userRepo.findById(id);
    return mapper.map(updatedUser, User, ResponseUserDto) as ResponseUserDto;
  }

  /**
   * Delete user
   */
  //  currentUser parameter add currentUser er
  public async deleteUser(id: number, currentUser: { userId: number, tenantId: number, roles: string[] }) {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid user ID", 400);
    }

    // secqurity check
    if (!currentUser.roles.includes('Head')) {
      throw new UserFriendlyException("Access Denied: Only Tenant Head can delete users", 403);
    }
    //  
    const targetUser = await this.userRepo.findById(id);
    if (!targetUser) {
      throw new UserFriendlyException(`User with ID ${id} not found`, 404);
    }

    // head will delete own user or anoter tenant user
    if (targetUser.tenantId !== currentUser.tenantId) {
      throw new UserFriendlyException("Access Denied: You cannot delete users from another tenant", 403);
    }

    const deleted = await this.userRepo.delete(id);
    if (!deleted) {
      throw new UserFriendlyException("Failed to delete user", 500);
    }
    await redisClient.del(`tenant:${currentUser.tenantId}:users`);
    console.log(`Cache cleared for tenant ${currentUser.tenantId} due to user deletion!`);
    return { success: true, message: "User deleted successfully" };
  }

  /**
   * Get users by tenant
   */
  /**
   * Get users by tenant
   */
 public async getUsersByTenant(
    tenantId: number,
    currentUser: { userId: number; tenantId: number; roles: string[] }
  ): Promise<ResponseUserDto[]> {

    if (!tenantId || tenantId <= 0) {
      throw new UserFriendlyException("Invalid tenant ID", 400);
    }

    if (!currentUser.roles.includes('Head')) {
      throw new UserFriendlyException("Access Denied: Only Tenant Head can view these users", 403);
    }

    if (tenantId !== currentUser.tenantId) {
      throw new UserFriendlyException("Access Denied: You can only view users of your own organization", 403);
    }

    
    const cacheKey = `tenant:${tenantId}:users`;

    
    const cachedUsers = await redisClient.get(cacheKey);
    
    if (cachedUsers) {
      console.log(`Fetching users for tenant ${tenantId} from Redis Cache `);

      return JSON.parse(cachedUsers) as ResponseUserDto[];
    }

    console.log(`Fetching users for tenant ${tenantId} from Database `);
    const users = await this.userRepo.findByTenantId(tenantId);
    const mappedUsers = mapper.mapArray(users, User, ResponseUserDto);

    
    await redisClient.setEx(cacheKey, 1800, JSON.stringify(mappedUsers));

    return mappedUsers;
  }

  /**
   * Authenticate user (for login)
   */

  // public async authenticateUser(email: string, password: string): Promise<any> {
  //   if (!email || !password) {
  //     throw new UserFriendlyException("Email and password are required", 400);
  //   }

  //   const user = await this.userRepo.findByEmailWithPassword(email);

  //   if (!user) {
  //     throw new UserFriendlyException("Invalid email or password", 401);
  //   }

  //   // Compare password
  //   const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if (!isPasswordValid) {
  //     throw new UserFriendlyException("Invalid email or password", 401);
  //   }

  //   // Return user without password
  //   const { password: _, ...userWithoutPassword } = user.toJSON(); //password field- extract and store  _ variable
  //   return userWithoutPassword;

  //   return user;
  // }

  // ==================================================================================

 public async authenticateUser(
    email: string,
    password: string
  ): Promise<{
    token: string;
    user: ResponseUserDto;
  }> {

    if (!email || !password) {
      throw new UserFriendlyException("Email and password are required", 400);
    }

    const user = await this.userRepo.findByEmailWithPassword(email);
    // console.log(user)
    if (!user) {
      throw new UserFriendlyException("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UserFriendlyException("Invalid email or password", 401);
    }
    const userPlain = user.toJSON(); 
    // console.log(userPlain)
    const roleNamesForToken = userPlain.roles ? userPlain.roles.map((r: any) => r.name) : [];

    const token = JwtUtility.generateToken({
      userId: user.id,
      tenantId: user.tenantId,
      roles: roleNamesForToken 
    });

    const mappedUser = mapper.map(
      user,
      User,
      ResponseUserDto
    );

    return {
      token,
      user: mappedUser
    };
  }

  // ==================================================================================

  // ------------
  // signUp
  // -----------

  public async signUp(data: signUpDto & { tenantId: number }): Promise<{ token: string; user: ResponseUserDto }> {
    try {
      UserValidator.validateSignUp(data);
    } catch (validation: any) {
      throw new UserFriendlyException(validation.message, 400);
    }
    
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new UserFriendlyException("User mail already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const existingTenantUsers = await this.userRepo.findByTenantId(data.tenantId);
    
    const roleName = existingTenantUsers.length === 0 ? 'Head' : 'User';

    const newUser = await this.userRepo.create({
      ...data,
      password: hashedPassword
    });

    const roleToAssign = await this.roleRepo.findByName(roleName);

    if (roleToAssign) {
      await this.userRepo.assignRole(newUser.id, roleToAssign.id);
      newUser.roles = [roleToAssign as any]; 
    }

  
    const token = JwtUtility.generateToken({
      userId: newUser.id,
      tenantId: newUser.tenantId,
      roles: [roleName] 
    });

    const mappedUser = mapper.map(newUser, User, ResponseUserDto);
    await redisClient.del(`tenant:${data.tenantId}:users`); 
    console.log(`Cache cleared for tenant ${data.tenantId} due to new signup!`);
    return { token, user: mappedUser };
  }
}