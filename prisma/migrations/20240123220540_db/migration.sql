/*
  Warnings:

  - Added the required column `superType` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "superType" TEXT NOT NULL,
ALTER COLUMN "hp" DROP NOT NULL;
