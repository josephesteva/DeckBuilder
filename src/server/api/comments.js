const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const verify = require('../util.js')


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

// POST creates a comment on behalf of a user with the user id included in the body
router.post('/', async (req, res, next) => {
	const {content, userId, deckId} = req.body;
	try {
		const newComment = await prisma.comment.create({
			data: {
				content,
				userId: +userId,
				deckId: +deckId
			}
		})
		res.status(201).send(newComment);
	} catch (err) {
		console.error(err);
	}
})

// creates a comment for a user that is logged in
// pull user id from the token included in the auth header
router.post('/currentuser', verify, async (req, res, next) => {
	const {content, deckId} = req.body;
	try {
		const newComment = await prisma.comment.create({
			data: {
				content,
				userId: req.user.id,
				deckId: +deckId
			}
		})
		res.status(201).send(newComment)
	} catch (err) {
		console.error(err);
	}
})

// PATCH updates the content for a comment, user must be logged in with auth header included
// comment id comes from the req params, content comes from the req body
router.patch('/:id', verify, async (req, res, next) => {
	const {id} = req.params;
	const {content} = req.body;
	try {
		const updatedComment = await prisma.comment.update({
			where: {
				id: +id
			},
			data: {
				content: content
			}
		})
		res.status(200).send(updatedComment)
	} catch (err) {
		console.error(err);
	}
})

// DELETE deletes a comment by comment id included in the req params
router.delete('/:id', async (req, res, next) => {
	const {id} = req.params;
	try {
		const deletedComment = await prisma.comment.delete({
			where: {
				id: +id
			}
		})
		res.status(200).send(deletedComment)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;