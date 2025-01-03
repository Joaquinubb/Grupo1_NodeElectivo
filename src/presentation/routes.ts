import { Router } from "express";
import { ArbitroRoutes } from "./arbitro/arbitro.routes";
import { EntrenadorRoutes } from "./entrenador/entrenador.routes";
import { ClubRoutes } from "./club/club.routes";
import { JugadorRoutes } from "./jugador/jugador.routes";
import { PartidoRoutes } from "./partido/partido.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", (req, res) => {
      res.send("API Chilean Premier League 2024");
    }); //Solo para probar que el servidor esta corriendo

    router.use("/api/arbitros", ArbitroRoutes.routes);
    router.use("/api/clubes", ClubRoutes.routes);
    router.use("/api/jugadores", JugadorRoutes.routes);
    router.use("/api/entrenadores", EntrenadorRoutes.routes);
    router.use("/api/partidos", PartidoRoutes.routes);

    return router;
  }
}
