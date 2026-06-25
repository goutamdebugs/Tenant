import { Controller, Get, Post, Put, Delete, Body, Path, Route, Tags, Query, Header, Security, Request} from "tsoa";
import { UserService } from "../../services/user/UserService";
import { CreateUserDto } from "../../dtos/user/CreateUserDto";
import { UpdateUserDto } from "../../dtos/user/UpdateUserDto";
import { DeleteUserDto } from "../../dtos/user/DeleteUserDto";
import { ResponseUserDto } from "../../dtos/user/ResponseUserDto";
import { LoginDto } from "../../dtos/user/LogInDto";
import { ResponseDto } from "../../dtos/common/ResponseDto";
import { signUpDto } from "../../dtos/user/SignUpDto";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  // Enforcing Dependency Injection
  constructor(private userService: UserService = new UserService()) {
    super();
  }

  // Create User
  @Post()
  public async createUser(
    @Body() requestBody: CreateUserDto
  ): Promise<ResponseDto<ResponseUserDto | null>> {
    return await ResponseDto.ReturnResult(() => this.userService.createUser(requestBody));
  }

  // Get All Users
  @Get()
  public async getAllUsers(): Promise<ResponseDto<ResponseUserDto[] | null>> {
    return await ResponseDto.ReturnResult(() => this.userService.getAllUsers());
  }

  // Get User By ID
  @Security("jwt")
  @Get("{id}")
  public async getUserById(
    @Path() id: number
  ): Promise<ResponseDto<ResponseUserDto | null>> {
    return await ResponseDto.ReturnResult(() => this.userService.getUserById(id));
  }

  // Update User
  @Security("jwt")
  @Put("{id}")
  public async updateUser(
    @Path() id: number,
    @Body() requestBody: UpdateUserDto
  ): Promise<ResponseDto<ResponseUserDto | null>> {
    return await ResponseDto.ReturnResult(() => this.userService.updateUser(id, requestBody));
  }

  // Delete User
  @Security("jwt")
  @Delete("{id}")
  public async deleteUser(
    @Path() id: number,
    @Request() req: any,

  ): Promise<ResponseDto<DeleteUserDto | null>> {
    return await ResponseDto.ReturnResult(() => this.userService.deleteUser(id, req.user));
  }

  // Get Users By Tenant ID
  // Get Users By Tenant ID
  @Security("jwt") 
  @Get("tenant/{tenantId}")
  public async getUsersByTenant(
    @Path() tenantId: number,
    @Request() req: any 
  ): Promise<ResponseDto<ResponseUserDto[] | null>> {
    return await ResponseDto.ReturnResult(() => 
      this.userService.getUsersByTenant(tenantId, req.user)
    );
  }

  // Login Authentication
  @Post("login")
  public async login(
  @Body() requestBody: LoginDto
): Promise<ResponseDto<{ token: string; user: ResponseUserDto } | null>> {
  return await ResponseDto.ReturnResult(() =>
    this.userService.authenticateUser(requestBody.email, requestBody.password)
  );
}

 @Post("signup")
  public async signup(
    @Body() requestBody: signUpDto,
    @Header("x-tenant-id") tenantId: number
  ): Promise<ResponseDto<{ token: string; user: ResponseUserDto } | null>> {
    return await ResponseDto.ReturnResult(()=>this.userService.signUp({...requestBody,tenantId}))
  }
  
}