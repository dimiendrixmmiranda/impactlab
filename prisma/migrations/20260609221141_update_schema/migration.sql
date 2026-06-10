/*
  Warnings:

  - You are about to drop the column `area` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `corStatus` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `energia` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `impacto` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `integridade` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `momento` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `tensao` on the `Simulation` table. All the data in the column will be lost.
  - Added the required column `diametroProjetil` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `espessura` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `massa` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `velocidade` to the `Simulation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Simulation" DROP COLUMN "area",
DROP COLUMN "corStatus",
DROP COLUMN "energia",
DROP COLUMN "impacto",
DROP COLUMN "integridade",
DROP COLUMN "momento",
DROP COLUMN "status",
DROP COLUMN "tensao",
ADD COLUMN     "diametroProjetil" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "espessura" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "massa" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "velocidade" DOUBLE PRECISION NOT NULL;
