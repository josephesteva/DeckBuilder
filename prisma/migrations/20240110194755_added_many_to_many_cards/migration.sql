-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_deckId_fkey";

-- CreateTable
CREATE TABLE "CardsOnDecks" (
    "deckId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "CardsOnDecks_pkey" PRIMARY KEY ("cardId","deckId")
);

-- AddForeignKey
ALTER TABLE "CardsOnDecks" ADD CONSTRAINT "CardsOnDecks_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardsOnDecks" ADD CONSTRAINT "CardsOnDecks_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
