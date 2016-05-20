'use strict'

var Astar = require('../models/astar');
var Graph = require('../models/graph');
var Dijkstras = require('../models/dijkstras');

export function findPath(req, res, next) {
    Graph.find({}, function (err, result) {
        if (err) console.log(err);
        else {
            	var a = new Dijkstras.MyGraph();
                a.setGraph(result)
                var s=a.getShortestPath(36,55)
                res.send(s);
        }
    })
}