import Tenant from "../../db/models/Tenant";
import { BaseRepo } from "../BaseRepo";


export class TenantRepo extends BaseRepo<Tenant>{
  constructor (){
    super(Tenant)
  }

  async findByName(name: string): Promise<Tenant | null> {
    // Use the Sequelize model directly
    return await Tenant.findOne({ 
      where: { name: name } 
    });
  }
}