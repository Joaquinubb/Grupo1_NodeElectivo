import { prisma } from "../../data/postgres";
import { CreateClub } from "../../domain/entities/club.entity";
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
        select: {
          id_club: true,
          nombre_club: true,
          ciudad_club: true,
          estadio_club: true,
          escudo_club: true,
          fechaFund_club: true,
          titulosPrimera_club: true,
          entrenador_club: {
            select: {
              nombre_entrenador: true,
              apellido_entrenador: true,
            },
          },
        },
        where: {
          id_club: id,
        },
      });

      if (!club) {
        throw CustomError.notFound("Club not found");
      }

      const clubToSend = {
        ...club,
        fechaFund_club: new Date(club?.fechaFund_club!)
          .toISOString()
          .split("T")[0],
        entrenador_club: `${club.entrenador_club?.nombre_entrenador} ${club.entrenador_club?.apellido_entrenador}`,
      };

      if (
        !club.entrenador_club?.nombre_entrenador ||
        !club.entrenador_club?.apellido_entrenador
      ) {
        clubToSend.entrenador_club = "No hay entrenador";
      }

      return clubToSend;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createClub(data: CreateClub) {
    try {
      const nombreExistente = await prisma.club.findFirst({
        select: {
          nombre_club: true,
        },
        where: {
          nombre_club: {
            equals: data.nombre_club.toLowerCase(),
            mode: "insensitive",
          },
        },
      });

      if (nombreExistente) {
        throw CustomError.conflict(
          `El nombre del club '${nombreExistente.nombre_club}' ya está en uso`
        );
      }

      const fechaFund = new Date(data.fechaFund_club);
      fechaFund.setUTCHours(0, 0, 0, 0);
      const fechaFundISO = fechaFund.toISOString();

      const club = await prisma.club.create({
        data: {
          ...data,
          fechaFund_club: fechaFundISO,
        },
      });

      return club;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(`${error}`);
    }
  }

  async deleteClubById(id: number) {
    try {
        // Eliminar jugadores relacionados con el club
        await prisma.jugador.updateMany({
            where: { clubId: id },
            data: {clubId: undefined }
        });

        // Eliminar entrenadores relacionados con el club
        await prisma.entrenador.updateMany({
            where: { clubId: id },
            data: { clubId: undefined }
        });

        // Ahora eliminar el club
        const club = await prisma.club.delete({
            where: { id_club: id },
        });

        return club;
    } catch (error) {
        throw error;
    }
  }
  
  async updateClubById(id: number, data:{
    nombre_club?: string; 
    ciudad_club?: string; 
    estadio_club?: string; 
    escudo_club?: string; 
    titulosPrimera_club?: number 
  }){
    try {
      const updateClub = await prisma.club.update({
        where: {id_club: id},
        data: {
          nombre_club: data.nombre_club,
          ciudad_club: data.ciudad_club,
          estadio_club: data.estadio_club,
          escudo_club: data.escudo_club,
          titulosPrimera_club: data.titulosPrimera_club,
        }
      });
      return updateClub;
    }catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(`${error}`);
    }
  }
}
