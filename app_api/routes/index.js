var express = require('express');
var router = express.Router();
var ctrlStation = require('../controllers/stationCtrl');
var ctrlGraph = require('../controllers/graphCtrl');


router.get('/downloadstation',ctrlStation.downloadAllStation);
router.get('/downloadinfroute',ctrlStation.downloadInfRoute);
router.get('/downloadroute',ctrlStation.downloadAllRoute);
router.get('/route',ctrlStation.getRoute);
router.get('/station',ctrlStation.getStation);
router.get('/initgraph',ctrlGraph.init);

module.exports = router;
