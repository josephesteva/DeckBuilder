const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const { faker } = require('@faker-js/faker');

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
				comments: {
					include: {
						deck: true
					}
				},
				Like: {
					include: {
						deck: true
					}
				},
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
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: +id,
			},
			include: {
				followers: true,
				following: true,
				comments: {
					include: {
						deck: true
					}
				},
			},
		})
		res.status(200).send(user);
	} catch (err) {
		console.error(err);
	}
})

// Update a user
// restricted to authenticated users
router.put('/', verify, async (req, res, next) => {
	const id = req.user.id;
	try {
		const updatedUser = await prisma.user.update({
			where: { id: +id },
			data: req.body,
			include: {
				followers: true,
				following: true,
				comments: true,
			},
		});
		res.json(updatedUser);
	} catch (error) {
		console.error(error.message);
		next(error);
	}
});

// POST
// creates a temporary user that can be used to try the website out 
router.post('/temp', async (req, res, next) => {
	try {
		const tempUser = await prisma.user.create({
			data: {
				username: faker.internet.userName(),
				email: faker.internet.userName(),
				password: faker.internet.password(),
				isAdmin: false,
				isTemp: true
			}
		})
		res.status(201).send(tempUser)
	} catch (error) {
		console.error(error);
	}
})

// PATCH
// changes a users admin status
router.patch('/admin/:id', async (req, res, next) => {
	const id = +req.params.id;
	try {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		})

		if (user.isAdmin == true) {
			const updatedUser = await prisma.user.update({
				where: {
					id
				},
				data: {
					isAdmin: false
				}
			})
			res.status(200).send(updatedUser)
		} else {
			const updatedUser = await prisma.user.update({
				where: {
					id
				},
				data: {
					isAdmin: true
				}
			})
			res.status(200).send(updatedUser)
		}

	} catch (error) {
		console.error(error);
	}
})

//delete a user
// restricted to authenticated users
router.delete('/:id', verify, async (req, res) => {
	const { id } = req.params;

	try {
		const deletedUser = await prisma.user.delete({
			where: {
				id: +id,
			},
		});

		res.status(200).send(deletedUser);
	} catch (error) {
		console.error(error);
	}
});

//deletes a temporary user, no authentication required
router.delete('/temp/:id', async (req, res) => {
	const id = +req.params.id;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			}
		})

		if (user.isTemp) {
			const deletedUser = await prisma.user.delete({
				where: {
					id: id,
				},
			});

			res.status(200).send(deletedUser);
		}
		else {
			console.log("User must be a temporary user")
			return;
		}

	} catch (error) {
		console.error(error);
	}
});
module.exports = router;

// FOLLOWERS
// follows a user with the followed user's id included in the req params
router.patch('/follow/:id', verify, async (req, res, next) => {
	const id = +req.params.id;
	try {
		const followedUser = await prisma.user.update({
			where: {
				id
			},
			data: {
				followers: {
					connect: { id: req.user.id }
				}
			}
		})
		res.send(followedUser)
	} catch (error) {
		console.error(error);
	}
})

// unfollows a user with the unfollowed users' id included in the req params
router.patch('/unfollow/:id', verify, async (req, res, next) => {
	const id = +req.params.id;
	try {
		const unfollowedUser = await prisma.user.update({
			where: {
				id
			},
			data: {
				followers: {
					disconnect: { id: req.user.id }
				}
			}
		})
		res.status(200).send(unfollowedUser)
	} catch (error) {
		console.error(error);
	}
})