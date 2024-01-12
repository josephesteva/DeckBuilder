const { PrismaClient } = require('.prisma/client');
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

module.exports = router;