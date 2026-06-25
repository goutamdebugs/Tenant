import User from "../../db/models/User";
import { BaseRepo } from "../BaseRepo";
import Role from "../../db/models/Role";
import { UserRole } from "../../db/models/UserRole";
export class UserRepo extends BaseRepo<User> {
  constructor() {
    super(User)
  }


  public async exists(id: number): Promise<boolean> {
    try {
      const count = await User.count({ where: { id } });
      return count > 0;
    } catch (error) {
      throw new Error(`Failed to check existence of user with ID ${id}`);
    }
  }

  /**
   * Find user by email
   */
  public async findByEmail(email: string) {
    try {
      return await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      throw new Error(`Failed to find user with email "${email}"`);
    }
  }

  /**
   * Find user by email with password (for login)
   */
  public async findByEmailWithPassword(email: string) {
    try {
      return await User.findOne(
        {
          where: { email },
          include: [
            {
              model: Role,
              through: { attributes: [] }, // through: { attributes: [] } come join table UserRole table will come
              attributes: ["id", "name", "displayName"]
            }
          ]
        }
      );
    } catch (error) {
      throw new Error(`Failed to find user with email "${email}"`);
    }
  }

  //  =======================

  public async assignRole(userId: number, roleId: number) {
  return await UserRole.findOrCreate({
    where: { userId: userId, roleId: roleId }, 
    defaults: { userId: userId, roleId: roleId }
  });
}

  // ========================
  // =============================================
  // =============================================
  /**
   * Find users by tenant
   */
  public async findByTenantId(tenantId: number) {
    try {
      return await User.findAll({
        where: { tenantId },
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      throw new Error(`Failed to fetch users for tenant ${tenantId}`);
    }
  }

}