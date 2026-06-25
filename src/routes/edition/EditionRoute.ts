import express from "express";
import { EditionController } from "../../controllers/edition/EditionController";
import { CreateEditionDto } from "../../dtos/edition/CreateEditionDto";
import { UpdateEditionDto } from "../../dtos/edition/UpdateEditionDto";

export class EditionRoute {
  public router: express.Router;

  constructor(private controller: EditionController) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.setupCreateRoute();
    this.setupGetAllRoute();
    this.setupGetByIdRoute();
    this.setupUpdateRoute();
    this.setupDeleteRoute();
  }

  private setupCreateRoute(): void {
    this.router.post("/", async (req, res) => {
      try {
        const dto: CreateEditionDto = req.body;
        const result = await this.controller.createEdition(dto);
        res.status(201).json(result);
      } catch (error) {
        console.error("Error in createEdition route:", error);
        res.status(500).json({ error: "Failed to create edition" });
      }
    });
  }

  private setupGetAllRoute(): void {
    this.router.get("/", async (req, res) => {
      try {
        const result = await this.controller.getAllEditions();
        res.json(result);
      } catch (error) {
        console.error("Error in getAllEditions route:", error);
        res.status(500).json({ error: "Failed to fetch editions" });
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

        const result = await this.controller.getEditionById(id);
        
        if (!result) {
          res.status(404).json({ error: "Edition not found" });
          return;
        }

        res.json(result);
      } catch (error) {
        console.error("Error in getEditionById route:", error);
        res.status(500).json({ error: "Failed to fetch edition" });
      }
    });
  }

  private setupUpdateRoute(): void {
    this.router.put("/:id", async (req, res) => {
      try {
        const id = parseInt(req.params.id, 10);
        
        if (isNaN(id)) {
          res.status(400).json({ error: "Invalid ID format" });
          return;
        }

        const dto: UpdateEditionDto = req.body;
        const result = await this.controller.updateEdition(id, dto);
        
        if (!result) {
          res.status(404).json({ error: "Edition not found" });
          return;
        }

        res.json(result);
      } catch (error) {
        console.error("Error in updateEdition route:", error);
        res.status(500).json({ error: "Failed to update edition" });
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

        const result = await this.controller.deleteEdition(id);
        res.json(result);
      } catch (error) {
        console.error("Error in deleteEdition route:", error);
        res.status(500).json({ error: "Failed to delete edition" });
      }
    });
  }
}