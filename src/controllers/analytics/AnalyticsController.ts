import { Request as ExpressRequest } from "express";
import { AnalyticsService } from "../../services/analytics/AnalyticsService";
import { ResponseDto } from "../../dtos/common/ResponseDto";
import { 
  Controller, 
  Get, 
  Path, 
  Route, 
  Tags, 
  Security, 
  Request, 
} from "tsoa";

@Route("api/analytics")
@Tags("Analytics") 
export class AnalyticsController extends Controller {
  private analyticsService: AnalyticsService;

  constructor() {
    super();
    this.analyticsService = new AnalyticsService();
  }

  @Get("timeline/tenant/{tenantId}")
  @Security("jwt", ["Head"]) 
  public async getUserTimeline(
    @Path() tenantId: number,
    @Request() req: ExpressRequest
  ): Promise<ResponseDto<any>> {
    
    
    return await ResponseDto.ReturnResult(async () => {
      const currentUser = (req as any).user; 
      const timelineData = await this.analyticsService.getTenantUserTimeline(tenantId, currentUser);
      this.setStatus(200);
      
      return timelineData;
    });
  }
}