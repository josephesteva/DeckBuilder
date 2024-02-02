const { PrismaClient } = require('.prisma/client');
const prisma = new PrismaClient()

const router = require('express').Router();
const verify = require('../util.js');


// GET gets all decks
router.get('/', async (req, res, next) => {
	try {
		const decks = await prisma.deck.findMany({
			include: {
				user: true, 
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
	const {id} = req.params;
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
	const {userid} = req.params;
	try {
		const userDecks = await prisma.deck.findMany({
			where: {
				userId: +userid
			}
		});
		res.status(200).send(userDecks);
	} catch (err) {
		console.error(err);
	}
})

//gets likes on a deck
router.get('/likes/:id', async (req, res, next) => {
	const deckId = +req.params.id;
	try {
		const likes = await prisma.like.findMany({
			where: {
				deckId
			}
		})
		res.status(200).send(likes)
	} catch (error) {
		console.error(error);
	}
})

// POST creates a new deck for the user assigned in the body
router.post('/', async (req, res, next) => {
	const {name, userId, description, numCards} = req.body;
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
	const {name, description} = req.body;
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

// creates a like by the current user on the deck specified in the params
router.post('/like/:id', verify, async (req, res, next) => {
	const {id} = req.params;
	try {
		const exists = await prisma.like.findFirst({
			where: {
				userId: req.user.id,
				deckId: +id
			}
		})
		if (exists) {
			console.log('Already exists')
			res.status(400)
			return
		}

		const like = await prisma.like.create({
			data: {
				userId: req.user.id,
				deckId: +id
			}
		})
		res.status(201).send(like)
	} catch (err) {
		console.error(err);
	}
})

// PATCH
// updates the information for a deck based on the body
router.patch('/:id', verify, async (req, res, next) => {
	const id = +req.params.id;
	const {name, description} = req.body;
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
// Delete deletes an existing deck by id

router.delete('/like/:id', async (req, res, next) => {
	const id = +req.params.id;
	try {
		const deletedLike = await prisma.like.delete({
			where: {
				id
			}
		})
		res.send(deletedLike)
	} catch (error) {
		console.error(error);
	}
})

// deletes a deck by deck id
router.delete('/:id', async (req, res, next) => {
	const {id} = req.params;
	try{
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

// deletes a like by like id
router.delete('like/:id', async (req, res, next) => {
	const id = +req.params.id;
	try {
		const deletedLike = await prisma.like.delete({
			where: {
				id
			}
		})
		res.send("Success")
	} catch (error) {
		console.error(error);
	}
})

module.exports = router;