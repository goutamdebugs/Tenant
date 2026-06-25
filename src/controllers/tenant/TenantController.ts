import { Controller, Get, Post, Put, Delete, Body, Path, Route, Tags } from "tsoa";
import { TenantService } from "../../services/tenant/TenantService";
import { CreateTenantDto } from "../../dtos/tenent/CreateTenantDto";
import { UpdateTenantDto } from "../../dtos/tenent/UpdateTenantDto";
import { DeleteTenantDto } from "../../dtos/tenent/DeleteTenantDto";
import { TenantResponseDto } from "../../dtos/tenent/TenantResponseDto";
import { ResponseDto } from "../../dtos/common/ResponseDto";

@Route("tenants")
@Tags("Tenant")
export class TenantController extends Controller {

  constructor(private tenantService: TenantService = new TenantService()) {
    super();
  }

  @Post()
  public async createTenant(
    @Body() requestBody: CreateTenantDto
  ): Promise<ResponseDto<TenantResponseDto | null>> {
    return await ResponseDto.ReturnResult(() => this.tenantService.createTenant(requestBody));
  }

  @Get()
  public async getAllTenants(): Promise<ResponseDto<TenantResponseDto[] | null>> {
    return await ResponseDto.ReturnResult(() => this.tenantService.getAllTenants());
  }

  @Get("{id}")
  public async getTenantById(
    @Path() id: number
  ): Promise<ResponseDto<TenantResponseDto | null>> {
    return await ResponseDto.ReturnResult(() => this.tenantService.getTenantById(id));
  }
  
  @Get("name/{name}")
  public async getTenantByName(
    @Path() name: string
  ): Promise<ResponseDto<TenantResponseDto | null>> {
    return await ResponseDto.ReturnResult(() => this.tenantService.getTenantByName(name));
  }


  @Put("{id}")
  public async updateTenant(
    @Path() id: number,
    @Body() requestBody: UpdateTenantDto
  ): Promise<ResponseDto<TenantResponseDto | null>> {
    return await ResponseDto.ReturnResult(() => this.tenantService.updateTenant(id, requestBody));
  }

  @Delete("{id}")
  public async deleteTenant(
    @Path() id: number
  ): Promise<ResponseDto<DeleteTenantDto | null>> {
    return await ResponseDto.ReturnResult(() => this.tenantService.deleteTenant(id));
  }
}