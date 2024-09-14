import { CustomError } from "../../domain/errors/custom.error";
import { formatDate } from "../../config/format-date";
import { prisma } from "../../data/postgres";

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
          fecha_partido: formatDate(new Date(partido.fecha_partido)),
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
      throw CustomError.internalServer(`${error}`);
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
      throw CustomError.internalServer(`${error}`);
    }
  }
}
