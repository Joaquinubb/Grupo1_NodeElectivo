import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";
import { calculateAge } from "../../config/age";

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
      throw CustomError.internalServer(`${error}`);
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
      throw CustomError.internalServer(`${error}`);
    }
  }

  async deleteArbitroById(id: number) {
    try {
      const arbitro = await prisma.arbitro.delete({
        where: {
          id_arbitro: id,
        },
      });

      return arbitro;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createArbitro(data: any) {
    try {
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
      throw CustomError.internalServer(`${error}`);
    }
  }
}
