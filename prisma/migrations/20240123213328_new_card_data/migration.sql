/*
  Warnings:

  - Added the required column `mainType` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondaryType` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setName` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "mainType" TEXT NOT NULL,
ADD COLUMN     "secondaryType" TEXT NOT NULL,
ADD COLUMN     "setName" TEXT NOT NULL;
