import { Request, Response } from "express";
import { ClubService } from "../services";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateClub } from "../../domain/entities/club.entity";

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

  getClubByName = async (req: Request, res: Response) => {
    const { nombre } = req.query;

    this.clubService
      .getClubByName(nombre as string)
      .then((club) => res.status(200).json(club))
      .catch((error) => this.handleError(error, res));
  };

  createClub = async (req: Request, res: Response) => {
    if (
      !req.query.nombre_club ||
      !req.query.ciudad_club ||
      !req.query.estadio_club ||
      !req.query.escudo_club ||
      !req.query.fechaFund_club ||
      !req.query.titulosPrimera_club
    ) {
      return res.status(400).json({
        error:
          "Faltan parametros, asegurese de que se esten ingresando nombre_club, ciudad_club, estadio_club, escudo_club,fechaFund_club y titulosPrimera_club",
      });
    }

    const data: CreateClub = {
      nombre_club: req.query.nombre_club as string,
      ciudad_club: req.query.ciudad_club as string,
      estadio_club: req.query.estadio_club as string,
      escudo_club: req.query.escudo_club as string,
      fechaFund_club: req.query.fechaFund_club as string,
      titulosPrimera_club: Number(req.query.titulosPrimera_club),
    };

    this.clubService
      .createClub(data)
      .then((club) => res.status(201).json(club))
      .catch((error) => this.handleError(error, res));
  };

  deleteClubById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    this.clubService
      .deleteClubById(id)
      .then((club) => res.status(200).json(club))
      .catch((error) => this.handleError(error, res));
  };
}
