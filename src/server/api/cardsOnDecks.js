const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// /api/deckcards/
//GET gets all of the cards in a deck by deckId
router.get('/:deckid', async (req, res, next) => {
	const { deckid } = req.params;
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

// gets all of the decks containing a card by cardId
router.get('/deckswith/:cardid', async (req, res, next) => {
	const { cardid } = req.params;
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
	const { deckId, cardId } = req.body;
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
		res.status(500).json({ err });//added this for frontend -dante
	}
})

router.delete('/:id', async (req, res, next) => {
	const id = +req.params.id;
	try {
		const card = await prisma.cardsOnDecks.delete({
			where: {
				id
			}
		})
		res.status(200).send(card);
	} catch (err) {
		console.error(err);
	}
})

// removes all cards from a deck
router.delete('/cleardeck', async (req, res, next) => {
	const { deckId } = req.body;
	try {
		const cardsRemoved = await prisma.cardsOnDecks.deleteMany({
			where: {
				deckId: +deckId
			}
		})
		res.status(200).send(cardsRemoved)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;