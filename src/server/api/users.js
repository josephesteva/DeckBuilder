const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const router = require('express').Router();
const verify = require('../util.js')

router.get('/current', verify, async (req, res, next) => {
	const id = req.user.id;
	try {
		const currentUser = await prisma.user.findUnique({
			where: {
				id: +id,
			},
			include: {
				followers: true,
				following: true,
				comments: true,
			  },
		})
		res.status(200).send(currentUser)
	} catch (err) {
		console.error(err);
	}
})

// GET gets all users
router.get('/', async (req, res, next) => {
	try {
		const users = await prisma.user.findMany()
		res.send(users)
	} catch (err) {
		console.error(err);
	}
})

// gets a user by user id
router.get('/:id', async (req, res, next) => {
	const {id} = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: +id,
			},
		})
		res.status(200).send(user);
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;
