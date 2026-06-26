import express from "express";
import swaggerUi from "swagger-ui-express";
import sequelize from "./config/database";
import mainRouter from "./routes/index"; 
import { redisClient } from "./cacse/RedisClient";




// Import the auto-generated swagger.json file from TSOA.
// Note: Adjust the path below based on where TSOA generates your swagger.json
import * as swaggerDocument from "./swagger/swagger.json"; 

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// Swagger UI Setup
// ============================================================================
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ============================================================================
// API Routes Setup
// ============================================================================
app.use("/api", mainRouter);

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});

// ============================================================================
// Start Server
// ============================================================================
async function startServer() {
  try {
    await sequelize.authenticate();
    await redisClient.connect();
    console.log("Database Connected Successfully");
    console.log("Rsdis Connected Successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Swagger Docs available at http://localhost:${PORT}/docs`);
    });

  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}
// async function clearAllData() {
//   try {
    
//     const tables = ['"user_roles"', '"users"', '"tenants"', '"roles"', '"editions"', '"tenant_editions"']; 
    
//     for (const table of tables) {
//       await sequelize.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`);
//       console.log(`Table ${table} cleared!`);
//     }
    
//     console.log("✅ All data cleared successfully!");
//   } catch (error) {
//     console.error("❌ Failed to clear data:", error);
//   }
// }
// clearAllData();
startServer();