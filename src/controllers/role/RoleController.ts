import { Controller, Get, Post, Put, Delete, Body, Path, Route, Tags } from "tsoa";
import { RoleService } from "../../services/role/RoleService";
import { CreateRoleDto } from "../../dtos/role/CreateRoleDto";
import { UpdateRoleDto } from "../../dtos/role/UpdateRoleDto";
import { DeleteRoleDto } from "../../dtos/role/DeleteRoleDto";
import { ResponseRoleDto } from "../../dtos/role/ResponseRoleDto";
import { ResponseDto } from "../../dtos/common/ResponseDto";

@Route("roles")
@Tags("Role")
export class RoleController extends Controller {
  constructor(private roleService: RoleService = new RoleService()) {
    super();
  }

  @Post()
  public async createRole(@Body() requestBody: CreateRoleDto): Promise<ResponseDto<ResponseRoleDto | null>> {
    return await ResponseDto.ReturnResult(() => this.roleService.createRole(requestBody));
  }

  @Get()
  public async getAllRoles(): Promise<ResponseDto<ResponseRoleDto[] | null>> {
    return await ResponseDto.ReturnResult(() => this.roleService.getAllRoles());
  }

  @Get("{id}")
  public async getRoleById(@Path() id: number): Promise<ResponseDto<ResponseRoleDto | null>> {
    return await ResponseDto.ReturnResult(() => this.roleService.getRoleById(id));
  }

  // Get Role By Name
  @Get("name/{name}")
  public async getRoleByName(@Path() name: string): Promise<ResponseDto<ResponseRoleDto | null>> {
    return await ResponseDto.ReturnResult(() => this.roleService.getRoleByName(name));
  }

  // Update Role
  @Put("{id}")
  public async updateRole(
    @Path() id: number,
    @Body() requestBody: UpdateRoleDto
  ): Promise<ResponseDto<ResponseRoleDto | null>> {
    return await ResponseDto.ReturnResult(() => this.roleService.updateRole(id, requestBody));
  }

  // Delete Role
  @Delete("{id}")
  public async deleteRole(@Path() id: number): Promise<ResponseDto<DeleteRoleDto | null>> {
    return await ResponseDto.ReturnResult(() => this.roleService.deleteRole(id));
  }
}