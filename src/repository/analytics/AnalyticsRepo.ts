import { QueryTypes } from "sequelize";
import sequelize from "../../config/database"; 

export class AnalyticsRepo {
  public async getUserTimelineByTenant(tenantId: number): Promise<any[]> {
    const query = `
      SELECT 
        id, 
        name, 
        email, 
        "createdAt",
        ROW_NUMBER() OVER (PARTITION BY "tenantId" ORDER BY "createdAt" ASC) as "joinOrder"
      FROM users
      WHERE "tenantId" = :tenantId
      ORDER BY "createdAt" DESC;
    `;

    return await sequelize.query(query, {
      replacements: { tenantId },
      type: QueryTypes.SELECT,
    });
  }
}