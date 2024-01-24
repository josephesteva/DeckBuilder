/*
  Warnings:

  - Added the required column `hp` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "hp" INTEGER NOT NULL,
ALTER COLUMN "secondaryType" DROP NOT NULL;
