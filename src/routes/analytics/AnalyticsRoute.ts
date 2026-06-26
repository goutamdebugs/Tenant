import { Router, Request, Response } from "express";
import { AnalyticsController } from "../../controllers/analytics/AnalyticsController";
import { authMiddleware } from "../../middlewares/authMiddleware"; // Apnar authMiddleware path

export class AnalyticsRoute {
  public router: Router;
  private controller: AnalyticsController;

  constructor() {
    this.router = Router();
    this.controller = new AnalyticsController();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // GET /api/analytics/timeline/tenant/:tenantId
    this.router.get("/timeline/tenant/:tenantId", authMiddleware, async (req: Request, res: Response) => {
      try {
        const tenantId = Number(req.params.tenantId);
        const result = await this.controller.getUserTimeline(tenantId, req);
        
        const statusCode = result.StatusCode || (result.Success ? 200 : 400);
        res.status(statusCode).json(result);
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
  }
}