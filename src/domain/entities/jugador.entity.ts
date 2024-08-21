import { PosicionJugador } from "@prisma/client";

export interface CreateJugador {
  nombre_jugador: string;
  apellido_jugador: string;
  nacionalidad_jugador: string;
  fechaNac_jugador: string;
  posicion_jugador: PosicionJugador;
  estatura_jugador: number;
  precio_jugador: number;
  club_jugador?: string;
}
