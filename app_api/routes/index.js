var express = require('express');
var router = express.Router();
var request = require('request');
var ctrlStation = require('../controllers/stationCtrl');

router.get('/routes', function(req, res, next) {
	request({
		uri: "http://thongtinxebuyt.com/Route/GetRoute",
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10
	}, function(error, response, body) {
		var data = JSON.parse(body);
		res.json(data);
	});
});

router.get('/stops', function(req, res, next) {
	var id = req.query.idroute;
	request({
		uri: "http://thongtinxebuyt.com/Route/GetRouteConnection?id_route="+id+"&is_checked=0",
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10
	}, function(error, response, body) {
		var data = JSON.parse(body);
		res.json(data);
	});
});

router.get('/downloadstation',ctrlStation.downloadAllStation);
router.get('/downloadinfroute',ctrlStation.downloadInfRoute);
router.get('/downloadroute',ctrlStation.downloadAllRoute);
router.get('/route',ctrlStation.getRoute);
router.get('/station',ctrlStation.getStation);

module.exports = router;
