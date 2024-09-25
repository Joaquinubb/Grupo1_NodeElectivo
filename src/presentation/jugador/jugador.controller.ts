import { Request, Response } from "express";
import { JugadorService } from "../services";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateJugador } from "../../domain/entities/jugador.entity";
import { PosicionJugador } from "@prisma/client";

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

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    this.jugadorService
      .getJugadorById(id)
      .then((jugador) => res.status(200).json(jugador))
      .catch((error) => this.handleError(error, res));
  };

  getJugadoresByClub = async (req: Request, res: Response) => {
    const { nombre } = req.query;
    if (!nombre) {
      return res.status(400).json({ error: "Debe ingresar un nombre de club" });
    }

    this.jugadorService
      .getJugadoresByClub(nombre as string)
      .then((jugadores) => res.status(200).json(jugadores))
      .catch((error) => this.handleError(error, res));
  };

  deleteJugador = async (req: Request, res: Response) => {
    const id = Number(req.query.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    this.jugadorService
      .deleteJugador(id)
      .then((jugador) => res.status(200).json(jugador))
      .catch((error) => this.handleError(error, res));
  };

  getJugadorbyName = async (req: Request, res: Response) => {
    const { apellido } = req.query;

    this.jugadorService
      .getJugadorByName(apellido as string)
      .then((jugadores) => res.status(200).json(jugadores))
      .catch((error) => this.handleError(error, res));
  };

  createJugador = async (req: Request, res: Response) => {
    if (
      !req.query.nombre_jugador ||
      !req.query.apellido_jugador ||
      !req.query.nacionalidad_jugador ||
      !req.query.fechaNac_jugador ||
      !req.query.posicion_jugador ||
      !req.query.estatura_jugador
    ) {
      return res.status(400).json({
        error:
          "Faltan parametros, asegurese de que se esten ingresando nombre_jugador, apellido_jugador, nacionalidad_jugador, fechaNac_jugador,posicion_jugador y estatura_jugador",
      });
    }

    if (
      typeof req.query.precio_jugador === "string" &&
      req.query.precio_jugador.trim() === ""
    ) {
      return res.status(400).json({ error: "Precio inválido" });
    }

    if (
      typeof req.query.estatura_jugador === "string" &&
      req.query.estatura_jugador.trim() === ""
    ) {
      return res.status(400).json({ error: "Estatura inválida" });
    }

    if (
      isNaN(Number(req.query.precio_jugador)) ||
      Number(req.query.precio_jugador) < 0
    ) {
      return res.status(400).json({ error: "Precio inválido" });
    }

    if (
      isNaN(Number(req.query.estatura_jugador)) ||
      Number(req.query.estatura_jugador) < 0
    ) {
      return res.status(400).json({ error: "Estatura inválida" });
    }

    const data: CreateJugador = {
      nombre_jugador: req.query.nombre_jugador as string,
      apellido_jugador: req.query.apellido_jugador as string,
      nacionalidad_jugador: req.query.nacionalidad_jugador as string,
      fechaNac_jugador: req.query.fechaNac_jugador as string,
      posicion_jugador: req.query.posicion_jugador
        .toString()
        .toUpperCase() as PosicionJugador,
      estatura_jugador: Number(req.query.estatura_jugador),
      precio_jugador: Number(req.query.precio_jugador),
      club_jugador: req.query.club_jugador as string,
    };

    this.jugadorService
      .createJugador(data)
      .then((jugador) => res.status(201).json(jugador))
      .catch((error) => this.handleError(error, res));
  };

  updateJugadorById = async (req: Request, res: Response) => {
    const id = Number(req.query.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    if (
      req.query.precio_jugador &&
      (isNaN(+req.query.precio_jugador) ||
        +req.query.precio_jugador < 0 ||
        (req.query.precio_jugador as string).trim() === "")
    ) {
      return res.status(400).json({ error: "Precio inválido" });
    }

    if (
      req.query.estatura_jugador &&
      (isNaN(+req.query.estatura_jugador) ||
        +req.query.estatura_jugador < 0 ||
        (req.query.estatura_jugador as string).trim() === "")
    ) {
      return res.status(400).json({ error: "Estatura inválida" });
    }

    const data = {
      nombre_jugador: req.query.nombre_jugador as string,
      apellido_jugador: req.query.apellido_jugador as string,
      nacionalidad_jugador: req.query.nacionalidad_jugador as string,
      fechaNac_jugador: req.query.fechaNac_jugador as string,
      precio_jugador: req.query.precio_jugador
        ? +req.query.precio_jugador
        : undefined,
      posicion_jugador: req.query.posicion_jugador
        ?.toString()
        .toUpperCase() as PosicionJugador,
      estatura_jugador: req.query.estatura_jugador
        ? +req.query.estatura_jugador
        : undefined,
      club_jugador: req.query.club_jugador as string,
    };

    this.jugadorService
      .updateJugadorbyId(id, data)
      .then((updatedJugador) => res.status(200).json(updatedJugador))
      .catch((error) => this.handleError(error, res));
  };
}
