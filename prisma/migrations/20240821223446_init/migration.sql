-- DropForeignKey
ALTER TABLE "Entrenador" DROP CONSTRAINT "Entrenador_clubId_fkey";

-- DropForeignKey
ALTER TABLE "Jugador" DROP CONSTRAINT "Jugador_clubId_fkey";

-- AlterTable
ALTER TABLE "Entrenador" ALTER COLUMN "clubId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Jugador" ALTER COLUMN "clubId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Entrenador" ADD CONSTRAINT "Entrenador_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id_club") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jugador" ADD CONSTRAINT "Jugador_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id_club") ON DELETE SET NULL ON UPDATE CASCADE;
