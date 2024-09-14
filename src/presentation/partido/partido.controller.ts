import { Request, Response } from "express";
import { PartidoService } from "../services";
import { CustomError } from "../../domain/errors/custom.error";
import { CreatePartido } from "../../domain/entities/partido.entity";

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

  createPartido = async (req: Request, res: Response) => {
    if (
      !req.query.fecha_partido ||
      !req.query.idLocal_partido ||
      !req.query.idVisita_partido ||
      !req.query.idArbitro_partido
    ) {
      return res.status(400).json({
        error:
          "Faltan parametros, asegurese de que se esten ingresando todos los datos: fecha_partido, idLocal_partido, idVisita_partido, idArbitro_partido",
      });
    }

    const data: CreatePartido = {
      fecha_partido: req.query.fecha_partido as string,
      idLocal_partido: +req.query.idLocal_partido,
      idVisita_partido: +req.query.idVisita_partido,
      idArbitro_partido: +req.query.idArbitro_partido,
    };

    this.partidoService
      .createPartido(data)
      .then((msg) => res.status(201).json(msg))
      .catch((error) => this.handleError(error, res));
  };
}
