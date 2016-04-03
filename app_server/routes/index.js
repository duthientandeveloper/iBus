var express = require('express');
var router = express.Router();
var routeStation = require('../controllers/index');

/* GET home page. */
router.get('/', routeStation.home);

router.get('/routestation',routeStation.routeStation);

module.exports = router;
