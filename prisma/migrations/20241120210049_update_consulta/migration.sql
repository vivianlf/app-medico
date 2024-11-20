/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Consulta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Consulta" DROP COLUMN "usuarioId",
ADD COLUMN     "pacienteId" INTEGER;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
