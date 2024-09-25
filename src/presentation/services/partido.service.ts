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
        !fecha_partido ||
        !idLocal_partido ||
        !idVisita_partido ||
        !idArbitro_partido
      ) {
        throw CustomError.badRequest("Faltan datos del partido");
      }

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

  async updatePartido(id_partido: number, fecha_partido: string) {
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

      const partido = await prisma.partido.update({
        where: {
          id_partido,
        },
        data: {
          fecha_partido: fecha_partido,
        },
      });

      return partido;
    } catch (error) {
      throw error;
    }
  }
}
