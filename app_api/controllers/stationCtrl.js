var mongoose = require('mongoose');
var Station = require('../models/station');
var Route = require('../models/route');
var request = require('request');
var async = require('async');
var htmlparser = require("htmlparser2");

function getPolyline(data) {
	if (data.localeCompare("") === 0) {
		return [];
	} else {
		var result = [];
		var location = data.split(" ");
		for (var i = 0; i < location.length; i++) {
			var lng = location[i].split(",")[0];
			var lat = location[i].split(",")[1];
			result.push({
				lat: parseFloat(lat),
				lng: parseFloat(lng)
			});
		}
		return result;
	}
}

function getBoolean(data) {
	return data.localeCompare("True") ? false : true;
}

function getDistance(data) {
	return parseInt((data.localeCompare("")) ? data : "0");
}

function downloadStation(url, callback) {
	request({
		uri: url,
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10
	}, function(error, response, body) {
		var data;
		try {
			 data= JSON.parse(body);
		} catch (err) {
			console.log(err);
		}
		if (data) {
			for (var i = 0; i < data.TABLE[0].ROW.length; i++) {
				var idRoute = parseInt(data.TABLE[0].ROW[i].COL[0].DATA);
				var id = parseInt(data.TABLE[0].ROW[i].COL[1].DATA);
				var symbol = data.TABLE[0].ROW[i].COL[2].DATA;
				var polyline = getPolyline(data.TABLE[0].ROW[i].COL[3].DATA);
				var isGo = getBoolean(data.TABLE[0].ROW[i].COL[4].DATA);
				var oder = parseInt(data.TABLE[0].ROW[i].COL[5].DATA);
				var distance = getDistance(data.TABLE[0].ROW[i].COL[6].DATA);
				var name = data.TABLE[0].ROW[i].COL[7].DATA;
				var lat = parseFloat(data.TABLE[0].ROW[i].COL[8].DATA);
				var lng = parseFloat(data.TABLE[0].ROW[i].COL[9].DATA);
				var title = data.TABLE[0].ROW[i].COL[10].DATA;
				var nextId=0;
				if((i+1)<data.TABLE[0].ROW.length){
					 nextId = parseInt(data.TABLE[0].ROW[i+1].COL[1].DATA);
				}
				var newStation = Station({
					idRoute: idRoute,
					id: id,
					symbol: symbol,
					polyline: polyline,
					isGo: isGo,
					oder: oder,
					distance: distance,
					name: name,
					lat: lat,
					lng: lng,
					title: title,
					nextId:nextId
				});
				newStation.save(getError());

			}
			console.log(data.TABLE[0].ROW[0].COL[0].DATA);
		}
		callback();
	});
}

function getError() {
	return function (err) {
		if (err) {
			console.log(err);
		}
	};
}

function downloadRoute(callback) {
	request({
		uri: "http://www.buyttphcm.com.vn/TTLT.aspx",
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10
	}, function(error, response, body) {
		var countSelected = 0;
		var oderRoute = 0;
		var parseOut = new htmlparser.Parser({
			onopentag: function(name, attr) {
				if (name.localeCompare("option") === 0) {
					if (attr.selected !== undefined)
						countSelected += 1;
					else if (countSelected == 2) {
						oderRoute += 1;
						var newRoute = Route({
							oderRoute: parseInt(oderRoute),
							name: " ",
							schedule: [],
							info: {},
							idRoute: attr.value
						});
						newRoute.save(function(err, route) {
							if (err) console.log(err);
							console.log(route.oderRoute);
						});
					}
				}
			}
		});
		parseOut.write(body);
		callback();
	});
}

function updateDatabase(id, oder, callback) {
	request({
		uri: "http://www.buyttphcm.com.vn/Detail_TTLT.aspx?sl=" + id,
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10
	}, function(error, response, body) {
		var isNext = false;
		var isTwoNext = -1;
		var name, type, distance, number, timeTrip, space, active, vehicle, company;
		var parseIn = new htmlparser.Parser({
			ontext: function(text) {
				if (isNext) {
					isNext = false;
					name = text;
				} else if (isTwoNext == 2 || isTwoNext == 1) {
					isTwoNext -= 1;
					if (isTwoNext === 0) {
						company = text;
					}
				}
				if (text.search("Tên tuyến :") != -1) {
					isNext = true;
				} else if (text.search("Loại h&#236;nh hoạt động:") != -1 || text.search("Loại hình hoạt động:") != -1) {
					type = text;
				} else if (text.search("Cự ly: ") != -1) {
					distance = text;
				} else if (text.search("Số chuyến") != -1) {
					number = text;
				} else if (text.search("Thời gian chuyến") != -1) {
					timeTrip = text;
				} else if (text.search("Giãn cách") != -1 || text.search("Gi&#227;n c&#225") != -1) {
					space = text;
				} else if (text.search("Thời gian hoạt động") != -1) {
					active = text;
				} else if (text.search("Loại xe") != -1) {
					vehicle = text;
				} else if (text.search("Đơn vị đảm nhận:") != -1) {
					isTwoNext = 2;
				}
			}
		});
		parseIn.write(body);
		console.log(oder);
		Route.findOne({
			oderRoute: oder
		}, function(err, route) {
			route.name = name;
			route.info = {
				type: type,
				distance: distance,
				number: number,
				timeTrip: timeTrip,
				space: space,
				active: active,
				vehicle: vehicle,
				company: company
			};
			route.save(function(err) {
				if (err) {
					console.log(err);
				}
				callback();
			});
		});
	});
}

function downloadInfoRoute(callback) {
	Route.find({}, function(err, stations) {
		var asyncTasks = [];
		stations.forEach(function(station) {
			var id = station.idRoute;
			var oder = station.oderRoute;
			asyncTasks.push(function(callback) {
				updateDatabase(id, oder, callback);
			});
		});
		async.series(asyncTasks);
		callback();
	});
}

module.exports.downloadAllStation = function(req, res, next) {
	var asyncTasks = [];
	var urls = [];
	for (var i = 1; i <= 137; i++) {
		urls.push("http://route.buyttphcm.com.vn/ajax.aspx?action=listRouteStations&rid=" + i + "&isgo=1");
		urls.push("http://route.buyttphcm.com.vn/ajax.aspx?action=listRouteStations&rid=" + i + "&isgo=0");
	}
	urls.forEach(function(url) {
		asyncTasks.push(function(callback) {
			downloadStation(url, callback);
		});
	});
	async.series(asyncTasks,function(){
		console.log("route updated");
	});
	res.send();
};
module.exports.downloadInfRoute =function (req,res,next) {
	var asyncTasks=[];
	asyncTasks.push(function(callback) {
		downloadInfoRoute(callback);
	});
	async.series(asyncTasks, function() {
		res.send();
	});
};
module.exports.downloadAllRoute = function(req, res, next) {
	var asyncTasks=[];
	asyncTasks.push(function(callback) {
		downloadRoute(callback);
	});
	async.series(asyncTasks, function() {
		res.send();
	});
};

module.exports.getRoute = function(req, res, next) {
	Route.find({}, function(err, route) {
		res.json(route);
	});
};

module.exports.getStation = function(req, res, next) {
	var id = req.query.id;
	var isGo = req.query.isgo.localeCompare("0") ? true : false;
	Station.find({
		idRoute: id,
		isGo: isGo
	}, function(err, stations) {
		if (err) res.json();
		res.json(stations);
	});

};
