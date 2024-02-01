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
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      include: {
        followers: true,
        following: true,
        comments: true,
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

//give a user admin
router.post("/giveAdmin/:id", async (req, res, next) => {
  const userId = parseInt(req.params.id);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isAdmin: true },
    });

    res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

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

module.exports = router;
