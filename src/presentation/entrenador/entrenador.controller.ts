import e, { Request, Response } from "express";
import { EntrenadorService } from "../services";
import { CustomError } from "../../domain/errors/custom.error";
import { error } from "console";

export class EntrenadorController {
  constructor(private readonly entrandorService: EntrenadorService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  getEntrenadores = async (req: Request, res: Response) => {
    this.entrandorService
      .getEntrenadores()
      .then((entrenadores) => res.status(200).json(entrenadores))
      .catch((error) => this.handleError(error, res));
  };

  getEntrenadorById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    this.entrandorService
      .getEntrenadorById(id)
      .then((entrenador) => res.status(200).json(entrenador))
      .catch((error) => this.handleError(error, res));
  };
}
