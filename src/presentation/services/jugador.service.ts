import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";
import { calculateAge } from "../../config/age";
import { CreateJugador } from "../../domain/entities/jugador.entity";

export class JugadorService {
  constructor() {}

  async getJugadores() {
    try {
      const jugadores = await prisma.jugador.findMany({
        select: {
          id_jugador: true,
          nombre_jugador: true,
          apellido_jugador: true,
          clubId: true,
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
        select: {
          id_jugador: true,
          nombre_jugador: true,
          apellido_jugador: true,
          nacionalidad_jugador: true,
          fechaNac_jugador: true,
          posicion_jugador: true,
          estatura_jugador: true,
          club_jugador: true,
        },
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
        club_jugador: jugador?.club_jugador?.nombre_club,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getJugadoresByClub(id: number) {
    try {
      const club = await prisma.club.findUnique({
        select: {
          nombre_club: true,
          jugadores_club: {
            select: {
              id_jugador: true,
              nombre_jugador: true,
              apellido_jugador: true,
              fechaNac_jugador: true,
              posicion_jugador: true,
            },
          },
        },
        where: {
          id_club: id,
        },
      });

      if (!club) {
        throw CustomError.notFound("Club not found");
      }

      const jugadoresConEdad = club.jugadores_club.map((jugador) => ({
        id: jugador.id_jugador,
        nombre: jugador.nombre_jugador,
        apellido: jugador.apellido_jugador,
        edad: calculateAge(new Date(jugador.fechaNac_jugador)),
        posicion: jugador.posicion_jugador,
      }));

      return {
        nombre_club: club.nombre_club,
        jugadores: jugadoresConEdad,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createJugador(data: CreateJugador) {
    try {
      const fechaNac = new Date(data.fechaNac_jugador);
      fechaNac.setUTCHours(0, 0, 0, 0);
      const fechaNacISO = fechaNac.toISOString();
      let jugador;
      if (data.club_jugador) {
        jugador = await prisma.jugador.create({
          data: {
            ...data,
            fechaNac_jugador: fechaNacISO,
            club_jugador: {
              connect: { nombre_club: data.club_jugador },
            },
          },
        });
      } else {
        jugador = await prisma.jugador.create({
          data: {
            ...data,
            fechaNac_jugador: fechaNacISO,
            club_jugador: undefined,
          },
        });
      }

      return jugador;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(`${error}`);
    }
  }
}
