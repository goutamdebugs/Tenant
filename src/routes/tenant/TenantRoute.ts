import express from "express";
import { TenantController } from "../../controllers/tenant/TenantController";
import { CreateTenantDto } from "../../dtos/tenent/CreateTenantDto";
import { UpdateTenantDto } from "../../dtos/tenent/UpdateTenantDto";

export class TenantRoute {
  public router: express.Router;

  // Initialize with a default controller to keep index.ts clean
  constructor(private controller: TenantController = new TenantController()) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.setupCreateRoute();
    this.setupGetAllRoute();
    this.setupGetByIdRoute();
    this.setupUpdateRoute();
    this.setupDeleteRoute();
    this.setupFindByNameRoute()
  }

  private setupCreateRoute(): void {
    this.router.post("/", async (req, res) => {
      try {
        const dto: CreateTenantDto = req.body;
        const result = await this.controller.createTenant(dto);
        res.status(201).json(result);
      } catch (error: any) {
        // Fallback status to 500 if the controller didn't specify one
        const status = this.controller.getStatus() || 500;
        res.status(status).json({ error: error.message || "Failed to create tenant" });
      }
    });
  }

  private setupGetAllRoute(): void {
    this.router.get("/", async (req, res) => {
      try {
        const result = await this.controller.getAllTenants();
        res.json(result);
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({ error: error.message || "Failed to fetch tenants" });
      }
    });
  }

  private setupGetByIdRoute(): void {
    this.router.get("/:id", async (req, res) => {
      try {
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
          res.status(400).json({ error: "Invalid ID format" });
          return;
        }

        const result = await this.controller.getTenantById(id);
        res.json(result);
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({ error: error.message || "Failed to fetch tenant" });
      }
    });
  }

  private setupFindByNameRoute():void {
      this.router.get("/name/:name", async(req,res)=>{
        const name : string = req.params.name;
        const result = await this.controller.getTenantByName(name)
        res.json(result)
      })
  }

  private setupUpdateRoute(): void {
    this.router.put("/:id", async (req, res) => {
      try {
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
          res.status(400).json({ error: "Invalid ID format" });
          return;
        }

        const dto: UpdateTenantDto = req.body;
        const result = await this.controller.updateTenant(id, dto);
        res.json(result);
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({ error: error.message || "Failed to update tenant" });
      }
    });
  }

  private setupDeleteRoute(): void {
    this.router.delete("/:id", async (req, res) => {
      try {
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
          res.status(400).json({ error: "Invalid ID format" });
          return;
        }

        const result = await this.controller.deleteTenant(id);
        res.json(result);
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({ error: error.message || "Failed to delete tenant" });
      }
    });
  }
}