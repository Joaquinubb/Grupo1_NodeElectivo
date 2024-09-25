import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";
import { calculateAge } from "../../config/age";
import { CreateJugador } from "../../domain/entities/jugador.entity";
import { normalizeString } from "../../config/normalize";
import { ValidDate } from "../../config/valid-date";
import { PosicionJugador } from "@prisma/client";

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
        orderBy: {
          apellido_jugador: "asc",
        },
      });

      return jugadores;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }

  async getJugadorByName(apellido?: string) {
    const normalizedApellido = apellido ? normalizeString(apellido) : null;

    try {
      const jugadores = await prisma.jugador.findMany({
        select: {
          id_jugador: true,
          nombre_jugador: true,
          apellido_jugador: true,
          nacionalidad_jugador: true,
          fechaNac_jugador: true,
          posicion_jugador: true,
          estatura_jugador: true,
          club_jugador: {
            select: {
              nombre_club: true,
            },
          },
        },
        orderBy: {
          apellido_jugador: "asc",
        },
      });

      const jugadoresFiltrados = jugadores.filter((jugador) => {
        const normalizedApellidoJugador = normalizeString(
          jugador.apellido_jugador
        );
        return (
          !normalizedApellido ||
          normalizedApellidoJugador.includes(normalizedApellido)
        );
      });

      const jugadoresModificados = jugadoresFiltrados.map((jugador) => {
        const edad = calculateAge(new Date(jugador.fechaNac_jugador));
        return {
          ...jugador,
          fechaNac_jugador: new Date(jugador.fechaNac_jugador)
            .toISOString()
            .split("T")[0],
          edad,
          club_jugador: jugador.club_jugador?.nombre_club,
        };
      });

      if (jugadoresModificados.length === 0) {
        throw CustomError.notFound("La búsqueda no arrojó resultados");
      }

      return jugadoresModificados;
    } catch (error) {
      throw error;
    }
  }

  async getJugadoresByClub(nombre: string) {
    const normalizedClubName = normalizeString(nombre);

    try {
      const clubes = await prisma.club.findMany({
        select: {
          nombre_club: true,
          jugadores_club: {
            select: {
              id_jugador: true,
              nombre_jugador: true,
              apellido_jugador: true,
              fechaNac_jugador: true,
              posicion_jugador: true,
              nacionalidad_jugador: true,
            },
            orderBy: {
              apellido_jugador: "asc",
            },
          },
        },
      });

      const club = clubes.find(
        (club) => normalizeString(club.nombre_club) === normalizedClubName
      );

      if (!club) {
        throw CustomError.notFound("Club no encontrado");
      }

      const jugadoresConEdad = club.jugadores_club.map((jugador) => ({
        id: jugador.id_jugador,
        nombre: jugador.nombre_jugador,
        apellido: jugador.apellido_jugador,
        edad: calculateAge(new Date(jugador.fechaNac_jugador)),
        posicion: jugador.posicion_jugador,
        nacionalidad: jugador.nacionalidad_jugador,
      }));

      if (jugadoresConEdad.length === 0) {
        return {
          nombre_club: club.nombre_club,
          jugadores: "No hay jugadores en este club",
        };
      }

      return {
        nombre_club: club.nombre_club,
        jugadores: jugadoresConEdad,
      };
    } catch (error) {
      throw error;
    }
  }

  async createJugador(data: CreateJugador) {
    try {
      if (!ValidDate(data.fechaNac_jugador)) {
        throw CustomError.badRequest("Fecha inválida");
      }
      const fechaNac = new Date(data.fechaNac_jugador);
      fechaNac.setUTCHours(0, 0, 0, 0);
      const fechaNacISO = fechaNac.toISOString();
      let jugador;

      if (
        !Object.values(PosicionJugador).includes(
          data.posicion_jugador.toUpperCase() as PosicionJugador
        )
      ) {
        throw CustomError.badRequest("Posición inválida");
      }

      if (data.club_jugador) {
        const clubExiste = await prisma.club.findUnique({
          where: { nombre_club: data.club_jugador },
        });
        if (!clubExiste) {
          throw CustomError.notFound("Club no encontrado");
        }

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
      throw error;
    }
  }

  async deleteJugador(id: number) {
    const jugadorExist = await prisma.jugador.findFirst({
      where: { id_jugador: id },
    });

    if (!jugadorExist) {
      throw CustomError.notFound("Jugador no existe");
    }

    try {
      const jugador = await prisma.jugador.delete({
        where: {
          id_jugador: id,
        },
      });

      return jugador;
    } catch (error) {
      throw error;
    }
  }

  async updateJugadorbyId(id: number, data: any) {
    try {
      let clubId = undefined;
      if (data.club_jugador) {
        const club = await prisma.club.findUnique({
          where: { nombre_club: data.club_jugador },
        });
        if (!club) {
          throw CustomError.notFound("Club no encontrado");
        }
        clubId = club.id_club;
      }

      if (data.fechaNac_jugador && !ValidDate(data.fechaNac_jugador)) {
        throw CustomError.badRequest("Fecha inválida");
      }

      const existJugador = await prisma.jugador.findUnique({
        where: { id_jugador: id },
      });
      if (!existJugador) throw CustomError.notFound("Jugador no existe");

      if (
        data.posicion_jugador &&
        !Object.values(PosicionJugador).includes(
          data.posicion_jugador.toUpperCase() as PosicionJugador
        )
      ) {
        throw CustomError.badRequest("Posición inválida");
      }

      const updateJugador = await prisma.jugador.update({
        where: { id_jugador: id },
        data: {
          nombre_jugador: data.nombre_jugador,
          apellido_jugador: data.apellido_jugador,
          nacionalidad_jugador: data.nacionalidad_jugador,
          fechaNac_jugador: data.fechaNac_jugador,
          precio_jugador: data.precio_jugador,
          posicion_jugador: data.posicion_jugador,
          estatura_jugador: data.estatura_jugador,
          ...(clubId !== undefined && { clubId: clubId }),
        },
      });

      return updateJugador;
    } catch (error) {
      throw error;
    }
  }
}
