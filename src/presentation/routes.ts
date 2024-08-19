import { Router } from "express";
import { ArbitroRoutes } from "./arbitro/arbitro.routes";
import { ClubRoutes } from "./club/club.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", (req, res) => {
      res.send("Hola mundo");
    }); //Solo para probar que el servidor esta corriendo

    router.use("/api/arbitros", ArbitroRoutes.routes);
    router.use("/api/clubes", ClubRoutes.routes);

    return router;
  }
}
