'use strict'

var Astar = require('../models/astar');
var Graph = require('../models/graph');
var Dijkstras = require('../models/dijkstras');

export function findPath(req, res, next) {
    var start = req.query.start;
    var end = req.query.end;
    Graph.find({}, function (err, result) {
        if (err) console.log(err);
        else {
            var myData = {};
            for (let i = 0; i < result.length; i++) {
                myData[result[i]['id']] = result[i];
            }
            var b = new Astar.aStart(myData, start,end);
            var data = [];
            for (let i = 0; i < b.length; i++) {
                var arr = myData[b[i]]['nextStation'];
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j] == b[i + 1]) {
                        var poly = myData[b[i]]['polyline'][j];
                    }
                }
                var object = {
                    id: b[i],
                    name: myData[b[i]]['name'],
                    lat: myData[b[i]]['lat'],
                    lng: myData[b[i]]['lng'],
                    polyline: poly===undefined?[]:poly.pl,
                }
                data[i] = object;

            }
            res.send(data);
        }
    })
}