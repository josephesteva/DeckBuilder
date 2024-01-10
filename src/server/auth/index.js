const router = require('express').Router();

router.get('/test', (req, res, next) => {
	res.send('Test Auth Endpoint')
})

module.exports = router;