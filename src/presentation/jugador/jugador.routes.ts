import { Router } from "express";
import { JugadorService } from "../services";
import { JugadorController } from "./jugador.controller";

export class JugadorRoutes {
  static get routes(): Router {
    const router = Router();

    const jugadorService = new JugadorService();

    const jugadorController = new JugadorController(jugadorService);

    router.get("/", jugadorController.getJugador);
    router.get("/club/:id", jugadorController.getJugadoresByClub);
    router.get("/:id", jugadorController.getJugadoresById);
    return router;
  }
}