'use strict';
import express from 'express';

var ctrlStation = require('../controllers/stationCtrl');
var ctrlGraph = require('../controllers/graphCtrl');

const router = express.Router();

router.get('/downloadstation',ctrlStation.downloadAllStation);
router.get('/downloadinfroute',ctrlStation.downloadInfRoute);
router.get('/downloadroute',ctrlStation.downloadAllRoute);
router.get('/route',ctrlStation.getRoute);
router.get('/station',ctrlStation.getStation);
router.get('/initgraph',ctrlGraph.init);

export default router;
