import { Router } from "express";
import { ClubService } from "../services";
import { ClubController } from "./club.controller";

export class ClubRoutes {
  static get routes(): Router {
    const router = Router();

    const clubService = new ClubService();

    const clubController = new ClubController(clubService);

    router.get("/", clubController.getClubes);
    router.get("/:id", clubController.getClubById);
    router.post("/", clubController.createClub);
    router.delete("/:id", clubController.deleteClubById);
    router.put("/:id", clubController.updateClubById);

    return router;
  }
}