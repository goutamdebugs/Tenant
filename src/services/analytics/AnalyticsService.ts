import { AnalyticsRepo } from "../../repository/analytics/AnalyticsRepo";
import { UserFriendlyException } from "../../dtos/common/UserFriendlyException";

export class AnalyticsService {
  constructor(private analyticsRepo: AnalyticsRepo = new AnalyticsRepo()) {}

  public async getTenantUserTimeline(
    tenantId: number,
    currentUser: { userId: number; tenantId: number; roles: string[] }
  ): Promise<any[]> {
    
    if (!tenantId || tenantId <= 0) {
      throw new UserFriendlyException("Invalid tenant ID", 400);
    }

    
    if (!currentUser.roles.includes("Head")) {
      throw new UserFriendlyException("Access Denied: Only Tenant Head can view this timeline", 403);
    }


    if (tenantId !== currentUser.tenantId) {
      throw new UserFriendlyException("Access Denied: You can only view your own organization timeline", 403);
    }

    return await this.analyticsRepo.getUserTimelineByTenant(tenantId);
  }
}