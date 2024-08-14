import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", (req, res) => {
      res.send("Hola mundo");
    }); //Solo para probar que el servidor esta corriendo

    //router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
