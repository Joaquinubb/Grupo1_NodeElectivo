import { Router } from "express";
import { ClubService } from "../services";
import { ClubController } from "./club.controller";

export class ClubRoutes {
  static get routes(): Router {
    const router = Router();

    const clubService = new ClubService();

    const clubController = new ClubController(clubService);

    router.get("/", clubController.getClubes);
    router.get("/club", clubController.getClubByName);
    router.post("/", clubController.createClub);
    router.delete("/", clubController.deleteClubById);
    router.put("/update", clubController.updateClubById);

    return router;
  }
}
