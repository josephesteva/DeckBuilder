const { PrismaClient } = require('.prisma/client');
const prisma = new PrismaClient()

const router = require('express').Router();
const verify = require('../util.js');


// GET 
// gets all decks
router.get('/', async (req, res, next) => {
	try {
		const decks = await prisma.deck.findMany({
			include: {
				user: true,
				comments: true,
				Like: true
			},
			orderBy: {
				Like: {
					_count: "desc"
				}
			}
		});
		res.status(200).send(decks)
	} catch (err) {
		console.error(err);
	}
})

// gets decks by currently signed in user
router.get('/mydecks', verify, async (req, res, next) => {
	try {
		const myDecks = await prisma.deck.findMany({
			where: {
				userId: req.user.id
			}
		})
		res.status(200).send(myDecks)
	} catch (err) {
		console.error(err);
	}
})

// gets a deck by deck id
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const deck = await prisma.deck.findUnique({
			where: {
				id: +id,
			},
			include: {
				Like: true,
				user: true
			}
		})
		res.status(200).send(deck)
	} catch (err) {
		console.error(err);
	}
})

// gets decks by user id
router.get('/user/:userid', async (req, res, next) => {
	const userId = +req.params.userid;
	try {
		const userDecks = await prisma.deck.findMany({
			where: {
				userId
			}
		});
		res.status(200).send(userDecks);
	} catch (err) {
		console.error(err);
	}
})

// POST 
// creates a new deck for the user assigned in the body
router.post('/', async (req, res, next) => {
	const { name, userId, description, numCards } = req.body;
	try {
		const deck = await prisma.deck.create({
			data: {
				name: name,
				userId: +userId,
				description: description,
				numCards: 60
			}
		})
		res.status(201).send(deck);
	} catch (err) {
		console.error(err);
	}
})

// creates a deck for the currently signed in user
router.post('/mydeck', verify, async (req, res, next) => {
	const { name, description } = req.body;
	try {
		const deck = await prisma.deck.create({
			data: {
				name: name,
				userId: req.user.id,
				description: description,
				numCards: 60
			}
		})
		res.status(201).send(deck);
	} catch (err) {
		console.error(err);
	}
})

// PATCH
// updates the information for a deck based on the body
router.patch('/:id', verify, async (req, res, next) => {
	const id = +req.params.id;
	const { name, description } = req.body;
	try {
		const deck = await prisma.deck.update({
			where: {
				id
			},
			data: {
				name,
				description
			}
		})
		res.status(200).send(deck)
	} catch (error) {
		console.error(error);
	}
})

// DELETE
// deletes a deck by deck id
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedDeck = await prisma.deck.delete({
			where: {
				id: +id
			}
		})
		res.status(200).send(deletedDeck)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;