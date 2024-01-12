const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// /api/deckcards/
//GET gets all of the cards in a deck by deckId
router.get('/:deckid', async (req, res, next) => {
	const {deckid} = req.params;
	try {
		const deckCards = await prisma.cardsOnDecks.findMany({
			where: {
				deckId: +deckid,
			},
		})
		res.status(200).send(deckCards);
	} catch (err) {
		console.error(err);
	}
})

// gets all of the decks containing a card by cardId
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

// POST adds a card to a deck
router.post('/', async (req, res, next) => {
	const {deckId, cardId} = req.body;
	try {
		const deckCard = await prisma.cardsOnDecks.create({
			data: {
				deckId: +deckId,
				cardId: +cardId
			}
		});
		res.status(201).send(deckCard)
	} catch (err) {
		console.error(err);
	}
})

// DELETE removes a card from a deck
router.delete('/', async (req, res, next) => {
	const {deckId, cardId} = req.body;
	try {
		const removedCard = await prisma.cardsOnDecks.delete({
			where: {
				cardId_deckId: {
					cardId: +cardId,
					deckId: +deckId
				}
			}
		})
		res.send(removedCard);
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;