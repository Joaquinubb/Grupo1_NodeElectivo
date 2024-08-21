import { Router } from "express";
import { JugadorService } from "../services";
import { JugadorController } from "./jugador.controller";

export class JugadorRoutes {
  static get routes(): Router {
    const router = Router();

    const jugadorService = new JugadorService();

    const jugadorController = new JugadorController(jugadorService);

    //router.get("/", jugadorController.getJugadores);
    router.get("/club", jugadorController.getJugadoresByClub);
    router.get("/:id", jugadorController.getJugadoresById);
    router.get("/", jugadorController.getJugadorbyName);
    router.delete("/delete", jugadorController.deleteJugador);

    return router;
  }
}
