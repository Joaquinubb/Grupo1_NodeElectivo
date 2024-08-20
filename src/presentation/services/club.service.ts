import { prisma } from "../../data/postgres";
import { CustomError } from "../../domain/errors/custom.error";

export class ClubService {
  constructor() {}

  async getClubes() {
    try {
      const clubes = await prisma.club.findMany({
        select: {
          id_club: true,
          nombre_club: true,
          escudo_club: true,
        },
      });

      return clubes;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getClubById(id: number) {
    try {
      const club = await prisma.club.findUnique({
        where: {
          id_club: id,
        },
      });

      if (!club) {
        throw CustomError.notFound("Club not found");
      }
      return club;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
