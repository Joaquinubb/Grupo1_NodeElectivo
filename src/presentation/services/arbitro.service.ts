import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";

export class ArbitroService {
  constructor() {}

  async getArbitros() {
    try {
      const arbitros = await prisma.arbitro.findMany({
        select: {
          id_arbitro: true,
          nombre_arbitro: true,
          apellido_arbitro: true,
        },
      });

      return arbitros;
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

      return arbitro;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
