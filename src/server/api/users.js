const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const router = require('express').Router();
const verify = require('../util.js')

router.get('/current', verify, async (req, res, next) => {
	try {
		const currentUser = await prisma.user.findUnique({
			where: {
				userId: req.user.id,
			}
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

<<<<<<< HEAD
module.exports = router;
=======

router.get('/current', verify, async (req, res, next) => {
	try {
		const currentUser = await prisma.user.findUnique({
			where: {
				userId: req.user.id,
			}
		})
		res.status(200).send(currentUser)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;
>>>>>>> cd98e3b994aaa8168b8dab09822bc83e8482c1ec
