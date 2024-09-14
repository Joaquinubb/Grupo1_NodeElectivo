import { Request, Response } from "express";
import { PartidoService } from "../services";
import { CustomError } from "../../domain/errors/custom.error";

export class PartidoController {
  constructor(private readonly partidoService: PartidoService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  getPartidos = async (req: Request, res: Response) => {
    this.partidoService
      .getPartidos()
      .then((partidos) => res.status(200).json(partidos))
      .catch((error) => this.handleError(error, res));
  };

  deletePartido = async (req: Request, res: Response) => {
    const id_partido = req.query.id_partido;

    this.partidoService
      .deletePartido(+id_partido!)
      .then((msg) => res.status(200).json(msg))
      .catch((error) => this.handleError(error, res));
  };
}
