import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";

export class JugadorService {
  constructor() {}

  async getJugadores() {
    try {
      const jugadores = await prisma.jugador.findMany({
        select: {
          nombre_jugador: true,
          apellido_jugador: true,
        },
      });

      return jugadores;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getJugadorById(id: number) {
    try {
      const jugador = await prisma.jugador.findUnique({
        where: {
          id_jugador: id,
        },
      });

      if (!jugador) {
        throw CustomError.notFound("Jugador not found");
      }

      return jugador;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getJugadoresByClub(id: number) {
    try {
      const club = await prisma.club.findUnique({
        select:{
            jugadores_club: true,
        },
        where: {
          id_club: id,
        },
      });

      if (!club) {
        throw CustomError.notFound("Jugador not found");
      }

      return club;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }


}


