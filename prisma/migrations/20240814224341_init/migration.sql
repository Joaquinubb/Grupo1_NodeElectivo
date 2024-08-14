-- CreateEnum
CREATE TYPE "PosicionJugador" AS ENUM ('PORTERO', 'DEFENSA', 'MEDIOCAMPISTA', 'DELANTERO');

-- CreateTable
CREATE TABLE "Arbitro" (
    "id_arbitro" SERIAL NOT NULL,
    "nombre_arbitro" TEXT NOT NULL,
    "apellido_arbitro" TEXT NOT NULL,
    "fechaNac_arbitro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Arbitro_pkey" PRIMARY KEY ("id_arbitro")
);

-- CreateTable
CREATE TABLE "Club" (
    "id_club" SERIAL NOT NULL,
    "nombre_club" TEXT NOT NULL,
    "ciudad_club" TEXT NOT NULL,
    "estadio_club" TEXT NOT NULL,
    "escudo_club" TEXT NOT NULL,
    "fechaFund_club" TIMESTAMP(3) NOT NULL,
    "titulosPrimera_club" INTEGER NOT NULL,
    "entrenadorId" INTEGER NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id_club")
);

-- CreateTable
CREATE TABLE "Entrenador" (
    "id_entrenador" SERIAL NOT NULL,
    "nombre_entrenador" TEXT NOT NULL,
    "apellido_entrenador" TEXT NOT NULL,
    "nacionalidad_entrenador" TEXT NOT NULL,
    "fechaNac_entrenador" TIMESTAMP(3) NOT NULL,
    "clubId" INTEGER NOT NULL,

    CONSTRAINT "Entrenador_pkey" PRIMARY KEY ("id_entrenador")
);

-- CreateTable
CREATE TABLE "Jugador" (
    "id_jugador" SERIAL NOT NULL,
    "nombre_jugador" TEXT NOT NULL,
    "apellido_jugador" TEXT NOT NULL,
    "nacionalidad_jugador" TEXT NOT NULL,
    "fechaNac_jugador" TIMESTAMP(3) NOT NULL,
    "precio_jugador" DOUBLE PRECISION NOT NULL,
    "posicion_jugador" "PosicionJugador" NOT NULL,
    "estatura_jugador" DOUBLE PRECISION NOT NULL,
    "clubId" INTEGER NOT NULL,

    CONSTRAINT "Jugador_pkey" PRIMARY KEY ("id_jugador")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entrenador_clubId_key" ON "Entrenador"("clubId");

-- AddForeignKey
ALTER TABLE "Entrenador" ADD CONSTRAINT "Entrenador_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id_club") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jugador" ADD CONSTRAINT "Jugador_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id_club") ON DELETE RESTRICT ON UPDATE CASCADE;
