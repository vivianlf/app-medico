/*
  Warnings:

  - Added the required column `dataNascimento` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objetivo` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Objetivo" AS ENUM ('DOENCAS_CRONICAS', 'EMAGRECIMENTO', 'HIPERTROFIA');

-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "dataNascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "objetivo" "Objetivo" NOT NULL,
ADD COLUMN     "sexo" BOOLEAN NOT NULL;
