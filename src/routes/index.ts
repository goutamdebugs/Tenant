import express from "express";

// Import Services
import { EditionService } from "../services/edition/EditionService";
import { TenantService } from "../services/tenant/TenantService";
import { UserService } from "../services/user/UserService";
import { RoleService } from "../services/role/RoleService";
// Import Controllers
import { EditionController } from "../controllers/edition/EditionController";
import { TenantController } from "../controllers/tenant/TenantController";
import { UserController } from "../controllers/user/UserController";
import { RoleController } from "../controllers/role/RoleController";
// Import Routes
import { EditionRoute } from "./edition/EditionRoute";
import { TenantRoute } from "./tenant/TenantRoute";
import { UserRoute } from "./user/UserRoute";
import { RoleRoute } from "./role/RoleRouter";

const router = express.Router();

// ============================================================================
// Edition Routes
// ============================================================================
const editionService = new EditionService();
const editionController = new EditionController(editionService);
const editionRoute = new EditionRoute(editionController);

router.use("/editions", editionRoute.router);

// ============================================================================
// Tenant Routes
// ============================================================================
const tenantService = new TenantService();
const tenantController = new TenantController(tenantService);
const tenantRoute = new TenantRoute(tenantController);

router.use("/tenants", tenantRoute.router);

// ============================================================================
// User Routes
// ============================================================================
const userService = new UserService()
const userController = new UserController(userService)
const userRoute = new UserRoute(userController)

router.use("/users", userRoute.router);
//POST   /users/login
//GET    /users/tenant/:tenantId

// ============================================================================
// Role Routes
// ============================================================================
const roleService = new RoleService()
const roleController = new RoleController(roleService)
const roleRouter = new RoleRoute(roleController)

router.use("/roles",roleRouter.router)

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

export default router;