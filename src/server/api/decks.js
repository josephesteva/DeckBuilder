const router = require('express').Router();

router.get('/test', (req, res, next) => {
	res.send("Test Decks Endpoint")
})

module.exports = router;