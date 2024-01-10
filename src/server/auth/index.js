const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




router.get('/test', (req, res, next) => {
	res.send('Test Auth Endpoint')
})

// POST 
// registers a new user
router.post('/register', async (req, res, next) => {
	const { username, email, password } = req.body;
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

//logs an existing user into the application
router.post('/login', async (req, res, next) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(401).send({ message: `Both a username and password are required to log in` })
		return
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				username,
			}
		});

		if (!user) {
			res.status(401).send({ message: `Invalid username`});
			return
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			res.status(401).send({ message: `Invalid password` })
			return
		}

		res.status(200).send(user)
	} catch (err) {
		console.error(err);
	}
})

module.exports = router;