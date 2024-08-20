import { CustomError } from "../../domain/errors/custom.error";
import { prisma } from "../../data/postgres";

export class EntrenadorService{
    constructor() {}

    async getEntrenadores() {
        try {
            const entrenadores = await prisma.entrenador.findMany({
                select: {
                    nombre_entrenador: true,
                    apellido_entrenador: true,
                },
            });

            return entrenadores
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getEntrenadorById(id: number){
        try {
            const entrenador = await prisma.entrenador.findUnique({
                where: {
                    id_entrenador: id,
                },
            });

            if (!entrenador) {
                throw CustomError.notFound("Entrenador not found");
            }

            return entrenador;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}