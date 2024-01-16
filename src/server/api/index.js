const router = require('express').Router();

router.use('/users', require('./users.js'));
router.use('/decks', require('./decks.js'));
router.use('/cards', require('./cards.js'));
router.use('/deckcards', require('./cardsOnDecks.js'));
router.use('/comments', require('./comments.js'));

module.exports = router;