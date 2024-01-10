const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




router.get('/test', (req, res, next) => {
	res.send('Test Auth Endpoint')
})

router.post('/register', async (req, res, next) => {
	const {username, email, password} = req.body;
	const SALT_ROUNDS = 5;
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
	try {
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				isAdmin: false
			}
		})
		res.status(201).send(newUser)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;