/*
  Warnings:

  - A unique constraint covering the columns `[nombre_club]` on the table `Club` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Club_nombre_club_key" ON "Club"("nombre_club");
