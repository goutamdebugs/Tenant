import { RoleRepo } from "../../repository/role/RoleRepo";
import { CreateRoleDto } from "../../dtos/role/CreateRoleDto";
import { UpdateRoleDto } from "../../dtos/role/UpdateRoleDto";
import { UserFriendlyException } from "../../dtos/common/UserFriendlyException";
import { mapper } from "../../mapper";
import Role from "../../db/models/Role";
import { ResponseRoleDto } from "../../dtos/role/ResponseRoleDto";

export class RoleService {
  constructor(private roleRepo: RoleRepo = new RoleRepo()) {}

  /**
   * Create Role
   */
  public async createRole(data: CreateRoleDto): Promise<ResponseRoleDto> {
    if (!data.name || !data.displayName) {
      throw new UserFriendlyException("name and displayName are required", 400);
    }

    const existingRole = await this.roleRepo.findByName(data.name);

    if (existingRole) {
      throw new UserFriendlyException(`Role "${data.name}" already exists`, 409);
    }

    const newRole = await this.roleRepo.create(data);
    return mapper.map(newRole, Role, ResponseRoleDto) as ResponseRoleDto;
  }

  /**
   * Get All Roles
   */
  public async getAllRoles(): Promise<ResponseRoleDto[]> {
    const rawRoles = await this.roleRepo.findAll();
    return mapper.mapArray(rawRoles, Role, ResponseRoleDto);
  }

  /**
   * Get Role By Id
   */
  public async getRoleById(id: number): Promise<ResponseRoleDto> {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid role ID", 400);
    }

    const role = await this.roleRepo.findById(id);

    if (!role) {
      throw new UserFriendlyException(`Role with ID ${id} not found`, 404);
    }

    return mapper.map(role, Role, ResponseRoleDto) as ResponseRoleDto;
  }

  /**
   * Get Role By Name
   */
  public async getRoleByName(name: string): Promise<ResponseRoleDto> {
    if (!name) {
      throw new UserFriendlyException("Role name is required", 400);
    }

    const role = await this.roleRepo.findByName(name);

    if (!role) {
      throw new UserFriendlyException(`Role "${name}" not found`, 404);
    }

    return mapper.map(role, Role, ResponseRoleDto) as ResponseRoleDto;
  }

  /**
   * Update Role
   */
  public async updateRole(id: number, data: UpdateRoleDto): Promise<ResponseRoleDto> {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid role ID", 400);
    }

    if (!data.name && !data.displayName) {
      throw new UserFriendlyException("At least one field (name or displayName) is required", 400);
    }

    const existingRole = await this.roleRepo.findById(id);

    if (!existingRole) {
      throw new UserFriendlyException(`Role with ID ${id} not found`, 404);
    }

    if (data.name && data.name !== existingRole.name) {
      const roleWithSameName = await this.roleRepo.findByName(data.name);

      if (roleWithSameName && roleWithSameName.id !== id) {
        throw new UserFriendlyException(`Role "${data.name}" already exists`, 409);
      }
    }

    const updated = await this.roleRepo.update(id, data);

    if (!updated) {
      throw new UserFriendlyException("Failed to update role", 500);
    }

    const updatedRole = await this.roleRepo.findById(id);
    return mapper.map(updatedRole, Role, ResponseRoleDto) as ResponseRoleDto;
  }

  /**
   * Delete Role
   */
  public async deleteRole(id: number) {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid role ID", 400);
    }

    const exists = await this.roleRepo.delete(id);

    if (!exists) {
      throw new UserFriendlyException(`Role with ID ${id} not found`, 404);
    }

    const deleted = await this.roleRepo.delete(id);

    if (!deleted) {
      throw new UserFriendlyException("Failed to delete role", 500);
    }

    return {
      success: true,
      message: "Role deleted successfully",
    };
  }
}