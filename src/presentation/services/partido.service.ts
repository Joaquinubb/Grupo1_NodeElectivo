import { CustomError } from "../../domain/errors/custom.error";
import { formatDate } from "../../config/format-date";
import { prisma } from "../../data/postgres";
import { CreatePartido } from "../../domain/entities/partido.entity";
import { ValidDate } from "../../config/valid-date";

export class PartidoService {
  constructor() {}

  async getPartidos() {
    try {
      const partidos = await prisma.partido.findMany({
        select: {
          id_partido: true,
          fecha_partido: true,
          club_local: true,
          club_visitante: true,
          arbitro: true,
        },
        orderBy: {
          fecha_partido: "asc",
        },
      });

      const partidosFormateados = partidos.map((partido) => {
        return {
          ...partido,
          fecha_partido: formatDate(partido.fecha_partido),
          club_local: partido.club_local?.nombre_club,
          club_visitante: partido.club_visitante?.nombre_club,
          estadio: partido.club_local?.estadio_club,
          arbitro:
            partido.arbitro?.nombre_arbitro +
            " " +
            partido.arbitro?.apellido_arbitro,
        };
      });

      return partidosFormateados;
    } catch (error) {
      throw error;
    }
  }

  async deletePartido(id_partido: number) {
    try {
      if (!id_partido) throw CustomError.badRequest("Falta el id del partido");

      const partido = await prisma.partido.findUnique({
        where: {
          id_partido,
        },
      });
      if (!partido) throw CustomError.notFound("Partido no encontrado");

      await prisma.partido.delete({
        where: {
          id_partido,
        },
      });

      const msg = `Partido ${id_partido} eliminado correctamente`;

      return msg;
    } catch (error) {
      throw error;
    }
  }

  async createPartido(data: CreatePartido) {
    try {
      const {
        fecha_partido,
        idLocal_partido,
        idVisita_partido,
        idArbitro_partido,
      } = data;

      if (
        idArbitro_partido < 0 ||
        idLocal_partido < 0 ||
        idVisita_partido < 0
      ) {
        throw CustomError.badRequest("ID inválido");
      }

      if (
        isNaN(idArbitro_partido) ||
        isNaN(idLocal_partido) ||
        isNaN(idVisita_partido)
      ) {
        throw CustomError.badRequest("ID inválido");
      }

      if (
        !fecha_partido ||
        !idLocal_partido ||
        !idVisita_partido ||
        !idArbitro_partido
      ) {
        throw CustomError.badRequest("Faltan datos del partido");
      }

      if (idLocal_partido === idVisita_partido) {
        throw CustomError.badRequest(
          "El club local no puede ser el mismo que el visitante"
        );
      }

      const clubLocal = await prisma.club.findUnique({
        where: {
          id_club: idLocal_partido,
        },
      });
      if (!clubLocal) throw CustomError.notFound("Club local no encontrado");

      const clubVisita = await prisma.club.findUnique({
        where: {
          id_club: idVisita_partido,
        },
      });
      if (!clubVisita)
        throw CustomError.notFound("Club visitante no encontrado");

      const arbitro = await prisma.arbitro.findUnique({
        where: {
          id_arbitro: idArbitro_partido,
        },
      });
      if (!arbitro) throw CustomError.notFound("Árbitro no encontrado");

      if (!ValidDate(fecha_partido)) {
        throw CustomError.badRequest("Fecha inválida");
      }

      const partido = await prisma.partido.create({
        data: {
          fecha_partido,
          idLocal_partido,
          idVisita_partido,
          idArbitro_partido,
        },
      });

      const msg = `Partido creado correctamente con id: ${partido.id_partido}`;

      return msg;
    } catch (error) {
      throw error;
    }
  }

  async updatePartido(
    id_partido: number,
    fecha_partido: string,
    id_arbitro: number
  ) {
    try {
      if (!id_partido) throw CustomError.badRequest("Falta el id del partido");

      const partidoExist = await prisma.partido.findUnique({
        where: {
          id_partido,
        },
      });

      if (fecha_partido && !ValidDate(fecha_partido)) {
        throw CustomError.badRequest("Fecha inválida");
      }

      if (!partidoExist) throw CustomError.notFound("Partido no encontrado");

      if (!id_arbitro) {
        throw CustomError.badRequest("Falta el id del árbitro");
      }

      if (id_arbitro) {
        const arbitroExist = await prisma.arbitro.findUnique({
          where: {
            id_arbitro: id_arbitro,
          },
        });

        if (!arbitroExist) throw CustomError.notFound("Árbitro no encontrado");
      }

      const partido = await prisma.partido.update({
        where: {
          id_partido,
        },
        data: {
          fecha_partido: fecha_partido,
          idArbitro_partido: id_arbitro,
        },
      });

      return partido;
    } catch (error) {
      throw error;
    }
  }
}
