const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verify = require("../util.js")

// GET
//gets likes on a deck
router.get('/:deckid', async (req, res, next) => {
	const deckId = +req.params.deckid;
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

// creates a like by the current user on the deck specified in the params
router.post('/:deckid', verify, async (req, res, next) => {
	const deckId = +req.params.deckid;
	try {
		const exists = await prisma.like.findFirst({
			where: {
				userId: req.user.id,
				deckId
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
				deckId
			}
		})
		res.status(201).send(like)
	} catch (err) {
		console.error(err);
	}
})

// DELETE
// deletes a like by like id
router.delete('/:id', async (req, res, next) => {
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

module.exports = router;