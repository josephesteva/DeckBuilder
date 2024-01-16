const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


// /api/comments/

//GET gets all comments  
router.get('/', async (req, res, next) => {
	try{
		const comments = await prisma.comment.findMany();
		res.status(200).send(comments)
	} catch (err) {
		console.error(err);
	}
})

// gets a comment by comment id
router.get('/:id', async (req, res, next) => {
	const {id} = req.params;
	try {
		const comment = await prisma.comment.findUnique({
			where: {
				id: +id
			}
		})
		res.status(200).send(comment)
	} catch (err) {
		console.error(err);
	}
})

// gets all comments on a deck by deck id
router.get('/ondeck/:deckid', async (req, res, next) => {
	const {deckid} = req.params;
	try {
		const deckComments = await prisma.comment.findMany({
			where: {
				deckId: +deckid
			}
		})
		res.status(200).send(deckComments)
	} catch (err) {
		console.error(err);
	}
})

// gets all comments by a user by user id
router.get('/byuser/:userid', async (req, res, next) => {
	const {userid} = req.params;
	try {
		const userComments = await prisma.comment.findMany({
			where: {
				userId: +userid
			}
		})
		res.status(200).send(userComments)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;