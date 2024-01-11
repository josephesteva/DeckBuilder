const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

// GET gets all cards
router.get('/', async (req, res, next) => {
	try {
		const cards = await prisma.card.findMany()
		res.send(cards)
	} catch (err) {
		console.error(err);
	}
})
// gets a card by card id
router.get('/:id', async (req, res, next) => {
	const {id} = req.params;
	try {
		const card = await prisma.card.findUnique({
			where: {
				id: +id,
			},
		})
		res.status(200).send(card);
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;