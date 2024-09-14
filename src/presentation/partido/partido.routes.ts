import { Router } from "express";
import { PartidoService } from "../services";
import { PartidoController } from "./partido.controller";

export class PartidoRoutes {
  static get routes(): Router {
    const router = Router();

    const partidoService = new PartidoService();

    const partidoController = new PartidoController(partidoService);

    router.get("/", partidoController.getPartidos);

    return router;
  }
}
