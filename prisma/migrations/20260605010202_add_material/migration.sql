/*
  Warnings:

  - Added the required column `material` to the `Simulation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Simulation" ADD COLUMN     "material" TEXT NOT NULL;
