import { Router } from "express";
import { ArbitroService } from "../services";
import { ArbitroController } from "./arbitro.controller";

export class ArbitroRoutes {
  static get routes(): Router {
    const router = Router();

    const arbitroService = new ArbitroService();

    const arbitroController = new ArbitroController(arbitroService);

    router.get("/", arbitroController.getArbitros);
    router.get("/:id", arbitroController.getArbitroById);
    router.delete("/:id", arbitroController.deleteArbitroById);
    router.post("/", arbitroController.createArbitro);
    router.put("/:id", arbitroController.updateArbitro);

    return router;
  }
}
