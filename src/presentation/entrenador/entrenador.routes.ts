import { Router } from "express";
import { EntrenadorService } from "../services";
import { EntrenadorController } from "./entrenador.controller";

export class EntrenadorRoutes {
    static get routes(): Router {
        const router = Router();

        const entrandorService = new EntrenadorService();

        const entrenadorController = new EntrenadorController(entrandorService);

        router.get("/", entrenadorController.getEntrenadores);
        router.get("/:id", entrenadorController.getEntrenadorById);

        return router;
    }
}