import express, { Request, Response } from "express";
import { RoleController } from "../../controllers/role/RoleController";

export class RoleRoute {
  public router: express.Router;
  private controller: RoleController;

  constructor(controller?: RoleController) {
    this.router = express.Router();
    this.controller = controller || new RoleController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.setupCreateRoute();
    this.setupGetAllRoute();
    this.setupGetByIdRoute();
    this.setupGetByNameRoute();
    this.setupUpdateRoute();
    this.setupDeleteRoute();
  }

  
  // POST /roles - Create Role
  
  private setupCreateRoute(): void {
    this.router.post("/", async (req: Request, res: Response) => {
      try {
        const result = await this.controller.createRole(req.body);
        res.status(201).json({
          success: true,
          data: result,
          message: "Role created successfully"
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to create role"
        });
      }
    });
  }

  
  // GET /roles - Get All Roles
  
  private setupGetAllRoute(): void {
    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const result = await this.controller.getAllRoles();
        res.json(result);
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to fetch roles"
        });
      }
    });
  }

  
  // GET /roles/:id - Get Role By ID
  
  private setupGetByIdRoute(): void {
    this.router.get("/:id", async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id as string, 10);
        
        if (isNaN(id) || id <= 0) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID format. ID must be a positive number"
          });
        }

        const result = await this.controller.getRoleById(id);
        res.json({
          success: true,
          data: result,
          message: "Role fetched successfully"
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to fetch role"
        });
      }
    });
  }

  
  // GET /roles/name/:name - Get Role By Name
  
  private setupGetByNameRoute(): void {
    this.router.get("/name/:name", async (req: Request, res: Response) => {
      try {
        const name = req.params.name as string;
        
        if (!name) {
          return res.status(400).json({
            success: false,
            error: "Role name is required"
          });
        }

        const result = await this.controller.getRoleByName(name);
        res.json({
          success: true,
          data: result,
          message: "Role fetched successfully"
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to fetch role by name"
        });
      }
    });
  }

  
  // PUT /roles/:id - Update Role
  
  private setupUpdateRoute(): void {
    this.router.put("/:id", async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id as string, 10);
        
        if (isNaN(id) || id <= 0) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID format. ID must be a positive number"
          });
        }

        const result = await this.controller.updateRole(id, req.body);
        res.json({
          success: true,
          data: result,
          message: "Role updated successfully"
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to update role"
        });
      }
    });
  }

  
  // DELETE /roles/:id - Delete Role
  
  private setupDeleteRoute(): void {
    this.router.delete("/:id", async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id as string, 10);
        
        if (isNaN(id) || id <= 0) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID format. ID must be a positive number"
          });
        }

        const result = await this.controller.deleteRole(id);
        res.json({
          success: true,
          data: result,
          message: "Role deleted successfully"
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to delete role"
        });
      }
    });
  }
}