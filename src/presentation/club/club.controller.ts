import { Request, Response } from "express";
import { ClubService } from "../services";
import { CustomError } from "../../domain/errors/custom.error";

export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  getClubes = async (req: Request, res: Response) => {
    this.clubService
      .getClubes()
      .then((clubes) => res.status(200).json(clubes))
      .catch((error) => this.handleError(error, res));
  };

  getClubById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    this.clubService
      .getClubById(id)
      .then((club) => res.status(200).json(club))
      .catch((error) => this.handleError(error, res));
  };
}
