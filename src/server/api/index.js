const router = require('express').Router();

router.use('/users', require('./users.js'));
router.use('/decks', require('./decks.js'));

module.exports = router;