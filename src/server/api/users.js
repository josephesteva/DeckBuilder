const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const verify = require('../util.js')

router.get('/test', (req, res, next) => {
	res.send("Test user endpoint");
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

router.get('/verification', verify, (req, res, next) => {
	res.send(req.user);
})

module.exports = router;