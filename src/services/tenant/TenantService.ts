import { TenantRepo } from "../../repository/tenant/TenantRepo";
import { CreateTenantDto } from "../../dtos/tenent/CreateTenantDto";
import { UpdateTenantDto } from "../../dtos/tenent/UpdateTenantDto";
import { UserFriendlyException } from "../../dtos/common/UserFriendlyException";
import { mapper } from "../../mapper";
import Tenant from "../../db/models/Tenant";
import { TenantResponseDto } from "../../dtos/tenent/TenantResponseDto";


export class TenantService {
  // DI (Dependency Injection)
  constructor(private tenantRepo: TenantRepo = new TenantRepo()) {}

  /**
   * Create a new tenant
   */
  public async createTenant(data: CreateTenantDto): Promise<TenantResponseDto> {
    // Validation
    if (!data.name || !data.displayName) {
      throw new UserFriendlyException("Name and display name are required", 400);
    }

    // Check for duplicate name
    const existingTenant = await this.tenantRepo.findByName(data.name);
    if (existingTenant) {
      throw new UserFriendlyException(`Tenant with name "${data.name}" already exists`, 409);
    }

    const newTenant = await this.tenantRepo.create(data);
    return mapper.map(newTenant, Tenant, TenantResponseDto) as TenantResponseDto;
  }

  /**
   * Get all tenants
   */
  public async getAllTenants(): Promise<TenantResponseDto[]> {
    const rawTenants = await this.tenantRepo.findAll();
    return mapper.mapArray(rawTenants, Tenant, TenantResponseDto);
  }

  /**
   * Get tenant by ID
   */
  public async getTenantById(id: number): Promise<TenantResponseDto> {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid tenant ID", 400);
    }

    const tenant = await this.tenantRepo.findById(id);
    
    if (!tenant) {
      throw new UserFriendlyException(`Tenant with ID ${id} not found`, 404);
    }

    return mapper.map(tenant, Tenant, TenantResponseDto) as TenantResponseDto;
  }


  public  async getTenantByName(name:string):Promise<TenantResponseDto> {
    if(!name){
       throw new UserFriendlyException("name are not found",401)
    }
    
    const tenant = await this.tenantRepo.findByName(name)

    return mapper.map(tenant,Tenant, TenantResponseDto,)

  }

  /**
   * Update tenant
   */
  public async updateTenant(id: number, data: UpdateTenantDto): Promise<TenantResponseDto> {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid tenant ID", 400);
    }

    // Check if tenant exists
    const tenant = await this.tenantRepo.findById(id);
    if (!tenant) {
      throw new UserFriendlyException(`Tenant with ID ${id} not found`, 404);
    }

    // Check for duplicate name if name is being updated
    if (data.name && data.name !== tenant.name) {
      const existingTenant = await this.tenantRepo.findByName(data.name);
      if (existingTenant && existingTenant.id !== id) {
        throw new UserFriendlyException(`Tenant with name "${data.name}" already exists`, 409);
      }
    }

    const updated = await this.tenantRepo.update(id, data);
    if (!updated) {
      throw new UserFriendlyException("Failed to update tenant", 500);
    }

    // Fetch and return updated tenant
    const updatedTenant = await this.tenantRepo.findById(id);
    return mapper.map(updatedTenant, Tenant, TenantResponseDto) as TenantResponseDto;
  }

  /**
   * Delete tenant
   */
  public async deleteTenant(id: number) {
    if (!id || id <= 0) {
      throw new UserFriendlyException("Invalid tenant ID", 400);
    }

    // Check if tenant exists
    const exists = await this.tenantRepo.delete(id);
    if (!exists) {
      throw new UserFriendlyException(`Tenant with ID ${id} not found`, 404);
    }

    const deleted = await this.tenantRepo.delete(id);
    
    if (!deleted) {
      throw new UserFriendlyException("Failed to delete tenant", 500);
    }

    return {
      success: true,
      message: "Tenant deleted successfully"
    };
  }
}