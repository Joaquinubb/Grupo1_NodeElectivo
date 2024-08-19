import { Request, Response } from "express";
import { ArbitroService } from "../services";
import { CustomError } from "../../domain/errors/custom.error";

export class ArbitroController {
  constructor(private readonly arbitroService: ArbitroService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  getArbitros = async (req: Request, res: Response) => {
    this.arbitroService
      .getArbitros()
      .then((arbitros) => res.status(200).json(arbitros))
      .catch((error) => this.handleError(error, res));
  };

  getArbitroById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    this.arbitroService
      .getArbitroById(id)
      .then((arbitro) => res.status(200).json(arbitro))
      .catch((error) => this.handleError(error, res));
  };
}
