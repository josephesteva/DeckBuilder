const { PrismaClient } = require('.prisma/client');
const prisma = new PrismaClient()

const router = require('express').Router();


// GET gets all decks
router.get('/', async (req, res, next) => {
	try {
		const decks = await prisma.deck.findMany({});
		res.status(200).send(decks)
	} catch (err) {
		console.error(err);
	}
})

// gets a deck by deck id
router.get('/:id', async (req, res, next) => {
	const {id} = req.params;
	try {
		const deck = await prisma.deck.findUnique({
			where: {
				id: +id,
			},
		})
		res.status(200).send(deck)
	} catch (err) {
		console.error(err);
	}
})

// POST creates a new deck
router.post('/', async (req, res, next) => {
	const {name, userId, description, numCards} = req.body;
	try {
		const deck = await prisma.deck.create({
			data: {
				name: name,
				userId: +userId,
				description: description,
				numCards: +numCards
			}
		})
		res.status(201).send(deck);
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;