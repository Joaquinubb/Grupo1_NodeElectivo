import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";
import { calculateAge } from "../../config/age";
import { ValidDate } from "../../config/valid-date";

export class ArbitroService {
  constructor() {}

  async getArbitros() {
    try {
      const arbitros = await prisma.arbitro.findMany({});
      const arbitrosConEdad = arbitros.map((arbitro) => ({
        ...arbitro,
        fechaNac_arbitro: new Date(arbitro.fechaNac_arbitro)
          .toISOString()
          .split("T")[0],
        edad: calculateAge(new Date(arbitro.fechaNac_arbitro)),
      }));
      return arbitrosConEdad;
    } catch (error) {
      throw error;
    }
  }

  async getArbitroById(id: number) {
    try {
      const arbitro = await prisma.arbitro.findUnique({
        where: {
          id_arbitro: id,
        },
      });

      if (!arbitro) {
        throw CustomError.notFound("Arbitro not found");
      }

      const edad = calculateAge(new Date(arbitro.fechaNac_arbitro));
      return {
        ...arbitro,
        fechaNac_arbitro: new Date(arbitro.fechaNac_arbitro)
          .toISOString()
          .split("T")[0],
        edad,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteArbitroById(id: number) {
    try {
      if (!id) throw CustomError.badRequest("Falta el id del arbitro");

      const existePartido = await prisma.partido.findFirst({
        where: {
          idArbitro_partido: id,
        },
      });

      if (existePartido)
        throw CustomError.badRequest(
          "No se puede borrar un arbitro con partidos asignados"
        );

      const existeArbitro = await prisma.arbitro.findUnique({
        where: {
          id_arbitro: id,
        },
      });

      if (!existeArbitro) throw CustomError.notFound("Arbitro no encontrado");

      const arbitro = await prisma.arbitro.delete({
        where: {
          id_arbitro: id,
        },
      });

      return arbitro;
    } catch (error) {
      throw error;
    }
  }

  async createArbitro(data: any) {
    try {
      if (
        !data.nombre_arbitro ||
        !data.apellido_arbitro ||
        !data.fechaNac_arbitro
      ) {
        throw CustomError.badRequest("Faltan datos");
      }

      if (!ValidDate(data.fechaNac_arbitro)) {
        throw CustomError.badRequest("Fecha inválida");
      }

      const fechaNac = new Date(data.fechaNac_arbitro);
      fechaNac.setUTCHours(0, 0, 0, 0);
      const fechaNacISO = fechaNac.toISOString();

      const arbitro = await prisma.arbitro.create({
        data: {
          nombre_arbitro: data.nombre_arbitro,
          apellido_arbitro: data.apellido_arbitro,
          fechaNac_arbitro: fechaNacISO,
        },
      });

      return arbitro;
    } catch (error) {
      throw error;
    }
  }

  async updateArbitro(id: number, data: any) {
    try {
      if (!id) throw CustomError.badRequest("Falta el id del arbitro");

      if (
        !data.nombre_arbitro &&
        !data.apellido_arbitro &&
        !data.fechaNac_arbitro
      ) {
        throw CustomError.badRequest("Faltan datos");
      }

      if (data.fechaNac_arbitro && !ValidDate(data.fechaNac_arbitro)) {
        throw CustomError.badRequest("Fecha inválida");
      }

      const arbitro = await prisma.arbitro.findUnique({
        where: {
          id_arbitro: id,
        },
      });

      if (!arbitro) throw CustomError.notFound("Arbitro no encontrado");

      const fechaNac = data.fechaNac_arbitro
        ? new Date(data.fechaNac_arbitro)
        : new Date(arbitro.fechaNac_arbitro);
      fechaNac.setUTCHours(0, 0, 0, 0);
      const fechaNacISO = fechaNac.toISOString();

      const arbitroActualizado = await prisma.arbitro.update({
        where: {
          id_arbitro: id,
        },
        data: {
          nombre_arbitro: data.nombre_arbitro || arbitro.nombre_arbitro,
          apellido_arbitro: data.apellido_arbitro || arbitro.apellido_arbitro,
          fechaNac_arbitro: fechaNacISO,
        },
      });

      return arbitroActualizado;
    } catch (error) {
      throw error;
    }
  }
}
