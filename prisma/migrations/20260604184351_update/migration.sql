/*
  Warnings:

  - You are about to drop the column `Imagem` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Simulation" DROP CONSTRAINT "Simulation_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Imagem",
ADD COLUMN     "imagem" TEXT,
ALTER COLUMN "sexo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Simulation" ADD CONSTRAINT "Simulation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
