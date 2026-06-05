/*
  Warnings:

  - You are about to drop the column `force` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `kineticEnergy` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `mass` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Simulation` table. All the data in the column will be lost.
  - You are about to drop the column `velocity` on the `Simulation` table. All the data in the column will be lost.
  - Added the required column `area` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corStatus` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energia` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impacto` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `integridade` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `momento` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Simulation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tensao` to the `Simulation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Simulation" DROP COLUMN "force",
DROP COLUMN "kineticEnergy",
DROP COLUMN "mass",
DROP COLUMN "material",
DROP COLUMN "name",
DROP COLUMN "velocity",
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "corStatus" TEXT NOT NULL,
ADD COLUMN     "energia" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "impacto" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "integridade" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "momento" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "tensao" DOUBLE PRECISION NOT NULL;
