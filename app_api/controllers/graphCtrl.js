/*jshint esversion: 6 */
var mongoose = require('mongoose');
var Graph = require('../models/graph');
var Station = require('../models/station');
var async = require('async');

module.exports.init = function(req,res,next){
  Station.find({}).distinct('id',function (err,arrIdStaion) {
    if (err) throw err;
    arrIdStaion.sort(sortNumber);
    arrIdStaion.forEach(function(idStation) {
      Station.find({id:idStation},function(err,arrDupStation) {
          var distance =[],belongRoute=[],nextStation=[];
          arrDupStation.forEach(function(dupSation) {
            distance.push(dupSation.distance);
            belongRoute.push(dupSation.idRoute);
            nextStation.push(dupSation.nextId);
          });
          var newGraph = Graph({
            id:idStation,
            distance:distance,
            belongRoute:belongRoute,
            nextStation:nextStation
          });
          newGraph.save(function () {});
      });
    });
    res.send('Xong');
  });
};

function sortNumber(a,b) {
    return a - b;
}
