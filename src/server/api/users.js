const router = require('express').Router();

router.get('/test', (req, res, next) => {
	res.send("Test user endpoint");
})

module.exports = router;