/*
  Warnings:

  - The primary key for the `CardsOnDecks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CardsOnDecks" DROP CONSTRAINT "CardsOnDecks_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CardsOnDecks_pkey" PRIMARY KEY ("id");
