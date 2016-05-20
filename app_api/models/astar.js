var mongoose = require('mongoose');
var Graph = require('../models/graph');
function distance(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);  // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d * 1000;
}
function deg2rad(deg) {
	return deg * (Math.PI / 180)
}

function getIndex(station, id) {
	for (var i = 0; i < station.length; i++) {
		if (station[i]['id'] == id) {
			return i;
		}
	}
	return -1;
}

function getBest(station, open, indexEnd) {
	var result = -1;
	var f = 100000000000000;
	for (var i = 0; i < open.length; i++) {
		var index = open[i];//getIndex(station,open[i]);
		//station[index]['h']=cacluation(station,index,indexEnd);
		//station[index]['f'] = station[index]['g'] + station[index]['h'];
		if (station[index]['f'] < f) {
			f = station[index]['f'];
			result = open[i];  // id of station
		}
	};
	return result; // id of station best
}

function remove(open, id) {
	open.splice(open.indexOf(id), 1);
}


function cacluation(station, indexPoint1, indexPoint2) {
	var result;
	result = distance(station[indexPoint1]['lat'], station[indexPoint1]['lng'], station[indexPoint2]['lat'], station[indexPoint2]['lng']);
	return result;
}

function myprint(station, close, start, end, startTime) {
	var c = station[end]['dadID'];//station[getIndex(station,end)]['dadID'];
	var count = close.length;
	console.log('Success');
	var path = [];
	var arr = [];
	arr.unshift(station[end]['id']);//arr.unshift(station[getIndex(station,end)]['id']);
	path.unshift(c);
	arr.unshift(c);
	for (var i = (close.length - 1); i > 0; i--) {
		if (c == station[close[i]]['id']) {
			c = station[close[i]]['dadID'];
			path.unshift(c);
			arr.unshift(c);
		}
	}
	var stringPath = "";
	for (var i = 0; i < path.length; i++) {
		stringPath += path[i] + "=>";
	}
	stringPath += station[end]['id'];

	console.log(station[end]['f'] + '    djashdashdjka');
	//console.log('This is arr: '+arr);
	//console.log('This is Path: '+stringPath);
	return arr;
}

export function aStart(station, idStart, idEnd) {
	var start = idStart;
	var end = idEnd;
	var finded = false;
	var indexStart = start;
	var indexEnd = end;
	station[indexStart]['g'] = 0;
	station[indexStart]['h'] = cacluation(station, indexStart, indexEnd);
	station[indexStart]['f'] = station[indexStart]['h'];
	var open = [];
	var close = [];
	open.push(start);
	while (open.length > 0) {
		var curent = getBest(station, open, indexEnd);
		remove(open, curent);
		if (curent == end) {
			finded = true;
			for (var i = 0; i < close.length; i++) {
			}

			return myprint(station, close, start, end);
			break;
		}
		close.push(curent);
		var indexCurent = curent;

		for (var i = 0; i < station[indexCurent]['nextStation'].length; i++) {

			var nextCurent = station[indexCurent]['nextStation'][i];
			var indexNextCurent = nextCurent;//getIndex(station,nextCurent); //indext nextCurent in station
			//console.log(nextCurent+"   duyet next");
			if (nextCurent != 0) {
				if (close.indexOf(nextCurent) != -1) {
					continue;
				}
				var tentative_gScore = station[indexCurent]['g'] + station[indexCurent]['distance'][i];
				if (open.indexOf(nextCurent) != -1) {
					if (tentative_gScore >= station[indexNextCurent]['g']) {
						continue;
					}
				} else {
					//console.log(indexNextCurent+' '+station[indexNextCurent]);
					open.push(station[indexNextCurent]['id']);
				}
				station[indexNextCurent]['dadID'] = station[indexCurent]['id'];
				station[indexNextCurent]['h'] = cacluation(station, indexNextCurent, indexEnd);
				station[indexNextCurent]['g'] = tentative_gScore;
				station[indexNextCurent]['f'] = station[indexNextCurent]['g'] + station[indexNextCurent]['h'];
			}

		}
	}

	if (!finded) {
		alert('Not Found!');
	}
}

// module.exports.getGraph = function(req,res,next) {
// 	Graph.find({},function(err,data) {

// 		var check= true;

// 		var myData={};

		// for(var i=0;i<data.length;i++){
		// 	myData[data[i]['id']]=data[i];
		// }

		// var station=myData;

// 		var d1= new Date();
// 		var startTime = ((d1.getHours()*60+d1.getMinutes())*60+d1.getSeconds())*1000+d1.getMilliseconds();
//        	var a = aStart(station,36, 55);
//        	var d2= new Date();
//         var endTime = ((d2.getHours()*60+d2.getMinutes())*60+d2.getSeconds())*1000+d2.getMilliseconds();
//         var time = endTime - startTime;
//         for(var i=0;i<a.length;i++){
//         	console.log('Station: '+a[i]);
//         }
// 		console.log('Time: '+time+'ms');

// 		//console.log(d.getHours()+'  '+d.getMinutes()+'  '+d.getMilliseconds());



// 		//console.log(timeEnd-timeStart);
// 		//console.log(timeStart);
// 		res.send();
// 	});
// }

