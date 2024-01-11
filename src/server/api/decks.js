const { PrismaClient } = require('.prisma/client');
const prisma = new PrismaClient()

const router = require('express').Router();

router.get('/test', (req, res, next) => {
	res.send("Test Decks Endpoint")
})

router.get('/', async (req, res, next) => {
	try {
		const decks = await prisma.deck.findMany({});
		res.status(200).send(decks)
	} catch (err) {
		console.error(err);
	}
})

router.get('/:id', async (req, res, next) => {
	const {id} = req.params
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

module.exports = router;