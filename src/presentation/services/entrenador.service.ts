import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";
import { calculateAge } from "../../config/age";

export class EntrenadorService {
  constructor() {}

  async getEntrenadores() {
    try {
      const entrenadores = await prisma.entrenador.findMany({
        select: {
          id_entrenador: true,
          nombre_entrenador: true,
          apellido_entrenador: true,
          club_entrenador: true,
        },
      });

      const entrenadoresToSend = entrenadores.map((entrenador) => ({
        ...entrenador,
        club_entrenador: entrenador.club_entrenador?.nombre_club,
      }));

      return entrenadoresToSend;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getEntrenadorById(id: number) {
    try {
      const entrenador = await prisma.entrenador.findUnique({
        select: {
          id_entrenador: true,
          nombre_entrenador: true,
          apellido_entrenador: true,
          nacionalidad_entrenador: true,
          fechaNac_entrenador: true,
          club_entrenador: true,
        },
        where: {
          id_entrenador: id,
        },
      });

      const entrenadorToSend = {
        ...entrenador,
        fechaNac_entrenador: new Date(entrenador?.fechaNac_entrenador!)
          .toISOString()
          .split("T")[0],
        club_entrenador: entrenador?.club_entrenador?.nombre_club,
        edad_entrenador: calculateAge(entrenador?.fechaNac_entrenador!),
      };

      if (!entrenador) {
        throw CustomError.notFound("Entrenador not found");
      }

      return entrenadorToSend;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
