import { Request, Response } from "express";
import { ArbitroService, JugadorService } from "../services";
import { CustomError } from "../../domain/errors/custom.error";

export class JugadorController {
  constructor(private readonly jugadorService: JugadorService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  getJugadores = async (req: Request, res: Response) => {
    this.jugadorService
      .getJugadores()
      .then((jugadores) => res.status(200).json(jugadores))
      .catch((error) => this.handleError(error, res));
  };

  getJugadoresById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    this.jugadorService
      .getJugadorById(id)
      .then((jugador) => res.status(200).json(jugador))
      .catch((error) => this.handleError(error, res));
  };

  getJugadoresByClub = async (req: Request, res: Response) => {
    const clubid = Number(req.params.id);

    this.jugadorService
      .getJugadoresByClub(clubid)
      .then((jugadores) => res.status(200).json(jugadores))
      .catch((error) => this.handleError(error, res));
  };

  deleteJugador = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    this.jugadorService
      .deleteJugador(id)
      .then((jugador) => res.status(200).json(jugador))
      .catch((error) => this.handleError(error, res));
  };
}
