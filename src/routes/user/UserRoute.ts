import express, { Request, Response, NextFunction } from "express";
import { UserController } from "../../controllers/user/UserController";
import { CreateUserDto } from "../../dtos/user/CreateUserDto";
import { UpdateUserDto } from "../../dtos/user/UpdateUserDto";
import { authMiddleware } from "../../middlewares/authMiddleware";
export class UserRoute {
  public router: express.Router;
  private controller: UserController;

  constructor(controller?: UserController) {
    this.router = express.Router();
    this.controller = controller || new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
  this.setupCreateRoute();
  this.setupGetAllRoute();
  this.setupGetByIdRoute();
  this.setupGetUsersByTenantRoute();
  this.setupLoginRoute();
  this.setupUpdateRoute();
  this.setupDeleteRoute();
  this.setupSignUpRoute(),
  this.setupRegisterRoute()
}

private setupRegisterRoute(): void {
  this.router.post("/register", async (req: Request, res: Response) => {
    try {

      const result = await this.controller.register(req.body);

      res.status(201).json(result);

    } catch (error: any) {

      const status = this.controller.getStatus() || 500;

      res.status(status).json({
        success: false,
        error: error.message
      });

    }
  });
}
  
  // POST /users - Create User
  
private setupCreateRoute(): void {
    this.router.post("/", async (req: Request, res: Response) => {
      try {
        const dto: CreateUserDto = req.body;
        const result = await this.controller.createUser(dto);
        
        res.status(201).json({
          success: true,
          data: result,
          message: "User created successfully"
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to create user"
        });
      }
    });
  }

  
  // GET /users - Get All Users
  
  private setupGetAllRoute(): void {
    this.router.get("/", async (req: Request, res: Response) => {
      try {
        const result = await this.controller.getAllUsers();
        
        res.json({
          success: true,
          data: result,
          message: "Users fetched successfully"
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to fetch users"
        });
      }
    });
  }

  
  // GET /users/:id - Get User By ID
  
  private setupGetByIdRoute(): void {
    this.router.get("/:id",authMiddleware, async (req: Request, res: Response) => {
      try {
        // Fix: Convert params.id to string and then to number
        const idParam = req.params.id;
        const id = typeof idParam === 'string' ? parseInt(idParam, 10) : NaN;

        if (isNaN(id) || id <= 0) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID format. ID must be a positive number"
          });
        }

        const result = await this.controller.getUserById(id);
        
        res.json({
          data: result
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to fetch user"
        });
      }
    });
  }

  
  // PUT /users/:id - Update User
  
  private setupUpdateRoute(): void {
    this.router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
      try {
        // Fix: Convert params.id to string and then to number
        const idParam = req.params.id;
        const id = typeof idParam === 'string' ? parseInt(idParam, 10) : NaN;

        if (isNaN(id) || id <= 0) {
          return res.status(400).json({
            success: false,
            error: "Invalid ID format. ID must be a positive number"
          });
        }

        const dto: UpdateUserDto = req.body;
        const result = await this.controller.updateUser(id, dto);
        
        res.json({
          success: true,
          data: result,
          message: "User updated successfully"
        });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to update user"
        });
      }
    });
  }

  
  // DELETE /users/:id - Delete User
  
  private setupDeleteRoute(): void {
    this.router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
      try {
        const idParam = req.params.id;
        const id = typeof idParam === 'string' ? parseInt(idParam, 10) : NaN;

        if (isNaN(id) || id <= 0) {
          return res.status(400).json({ success: false, error: "Invalid ID format" });
        }

        // 🌟 কন্ট্রোলারকে req পাস করে দেওয়া হলো
        const result = await this.controller.deleteUser(id, req); 
        
        res.json({ success: true, data: result, message: "User deleted successfully" });
      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({
          success: false,
          error: error.message || "Failed to delete user"
        });
      }
    });
  }

//GET    /users/tenant/:tenantId
  //GET    /users/tenant/:tenantId
// GET /users/tenant/:tenantId
  private setupGetUsersByTenantRoute(): void {
    this.router.get("/tenant/:tenantId", authMiddleware, async (req: Request, res: Response) => {
      try {
        const tenantId = Number(req.params.tenantId);

        if (isNaN(tenantId) || tenantId <= 0) {
          return res.status(400).json({ success: false, error: "Invalid tenant ID" });
        }

      
        const result = await this.controller.getUsersByTenant(tenantId, req);

        
        const statusCode = result.StatusCode || (result.Success ? 200 : 400);
        
      
        res.status(statusCode).json(result);

      } catch (error: any) {
        const status = this.controller.getStatus() || 500;
        res.status(status).json({ success: false, error: error.message });
      }
    });
  }
//POST   /users/login
private setupLoginRoute(): void {
  this.router.post("/login", async (req, res) => {
    try {

      const { email, password } = req.body;

      const result = await this.controller.login({
        email,
        password
      });

      res.status(200).json(result);

    } catch (error: any) {

      const status =
        this.controller.getStatus() || 401;

      res.status(status).json({
        success: false,
        error: error.message
      });

    }
  });
}
  
//POST /user/signup

private setupSignUpRoute():void {
  this.router.post("/signup",async(req:Request,res:Response)=>{
    const dto: CreateUserDto = req.body;
    const tenantIdHeader = req.headers['x-tenant-id'] ? Number(req.headers['x-tenant-id']) : undefined;
    
    if (!tenantIdHeader || isNaN(tenantIdHeader)) {
        res.status(400).json({ error: "x-tenant-id header is required and must be a number" });
        return;
      }

    const result = await this.controller.signup(dto,tenantIdHeader);

    res.status(201).json(result)

  })
}

  
}