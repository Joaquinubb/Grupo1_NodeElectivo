import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";
import { calculateAge } from "../../config/age";
import { normalizeString } from "../../config/normalize";

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

  async getEntrenadorByName(apellido?: string) {
    const normalizedApellido = apellido ? normalizeString(apellido) : null;

    try {
      const entrenadores = await prisma.entrenador.findMany({
        select: {
          id_entrenador: true,
          nombre_entrenador: true,
          apellido_entrenador: true,
          nacionalidad_entrenador: true,
          fechaNac_entrenador: true,
          club_entrenador: true,
        },
      });

      const entrenadoresFiltrados = entrenadores.filter((entrenador) => {
        const normalizedApellidoEntrenador = normalizeString(
          entrenador.apellido_entrenador
        );
        return (
          !normalizedApellido ||
          normalizedApellidoEntrenador.includes(normalizedApellido)
        );
      });

      const entrenadoresModificados = entrenadoresFiltrados.map(
        (entrenador) => {
          const edad = calculateAge(new Date(entrenador.fechaNac_entrenador));
          return {
            ...entrenador,
            fechaNac_entrenador: new Date(entrenador.fechaNac_entrenador)
              .toISOString()
              .split("T")[0],
            edad,
            club_entrenador: entrenador?.club_entrenador?.nombre_club,
            edad_entrenador: calculateAge(entrenador?.fechaNac_entrenador!),
          };
        }
      );

      if (!entrenadores) {
        throw CustomError.notFound("Entrenador not found");
      }

      return entrenadoresModificados;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
