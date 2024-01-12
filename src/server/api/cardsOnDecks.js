const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

//GET gets all of the cards in a deck by deckId
router.get('/:deckid', async (req, res, next) => {
	const {deckid} = req.params;
	try {
		const deckCards = await prisma.cardsOnDecks.findMany({
			where: {
				deckId: +deckid,
			},
			include: {
				card: true, 
			  },
		})
		res.status(200).send(deckCards);
	} catch (err) {
		console.error(err);
	}
})

//GET gets all of the decks containing a card by cardId
router.get('/deckswith/:cardid', async (req, res, next) => {
	const {cardid} = req.params;
	try {
		const cardDecks = await prisma.cardsOnDecks.findMany({
			where: {
				cardId: +cardid,
			},
		})
		if (cardDecks[0]) {
			res.status(200).send(cardDecks);
		} else {
			res.send('This card is not currently used in any decks')
		}
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;