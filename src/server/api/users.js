const router = require('express').Router();
const verify = require('../util.js')

router.get('/test', (req, res, next) => {
	res.send("Test user endpoint");
})

router.get('/verification', verify, (req, res, next) => {
	res.send(req.user);
})

module.exports = router;