import Role from "../../db/models/Role";
import { BaseRepo } from "../BaseRepo";

export class RoleRepo extends BaseRepo<Role>{
  constructor(){
    super(Role)
  }
   public async findById(id:number){
    return await Role.findByPk(id);
}
  public async findByName(name: string) { 
    try {
      return await Role.findOne({
        where: { name }
      });
    } catch (error) {
      throw new Error(`Failed to find role with name "${name}"`);
    }
  }

}