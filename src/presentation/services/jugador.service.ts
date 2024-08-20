import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";
import { calculateAge } from "../../config/age";

export class JugadorService {
  constructor() {}

  async getJugadores() {
    try {
      const jugadores = await prisma.jugador.findMany({
        select: {
          id_jugador: true,
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

      const edad = calculateAge(new Date(jugador.fechaNac_jugador));
      return {
        ...jugador,
        fechaNac_jugador: new Date(jugador.fechaNac_jugador)
          .toISOString()
          .split("T")[0],
        edad,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getJugadoresByClub(id: number) {
    try {
      const club = await prisma.club.findUnique({
        select: {
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
