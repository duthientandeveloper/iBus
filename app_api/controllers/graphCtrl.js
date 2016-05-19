/*jshint esversion: 6 */

var mongoose = require('mongoose');
var Graph = require('../models/graph');
var Station = require('../models/station');
var async = require('async');

module.exports.init = function (req, res, next) {
  Station.find({}).distinct('id', function (err, arrIdStaion) {
    var cn = 0;
    if (err) throw err;
    arrIdStaion.sort(sortNumber);
    for (let i = 0; i < arrIdStaion.length; i++) {
      let idStation = arrIdStaion[i];
      Station.find({ id: idStation }, function (err, arrDupStation) {
        let distance = [], belongRoute = [], nextStation = [], polyline = [], name = arrDupStation[0].name;
        async.waterfall([
          (callback) => {
            //console.log(arrDupStation.length)
            for (let index = 0; index < arrDupStation.length; index++) {
              let dupSation = arrDupStation[index];
              Station.find({
                id: dupSation.nextId,
                idRoute: dupSation.idRoute,
                isGo: dupSation.isGo
              }, function (err, nStation) {
                if (err) console.log(err)
                if (nextStation.indexOf(dupSation.nextId) === -1&&nStation.length!==0) {
                  nextStation.push(dupSation.nextId);
                  polyline.push({ pl: nStation[0].polyline });
                  distance.push(nStation[0].distance);
                  belongRoute.push(dupSation.idRoute);
                }
                if (index == arrDupStation.length - 1) {
                  callback(null,dupSation.id,dupSation.name,polyline,distance,belongRoute,nextStation);
                }
              });
            }
          },
          (id,name,polyline,distance,belongRoute,nextStation,callback)=>{
            let newGraph = Graph({
            id: idStation,
            name: name,
            polyline: polyline,
            distance: distance,
            belongRoute: belongRoute,
            nextStation: nextStation
          });
          console.log('Xong' +id);
          newGraph.save(function (err) {
            if (err) console.log(err)
            callback(null,id)
          });
          }
        ], function (err,res) {
          console.log('Xong' +res);
        });
      });
    }
  res.send('Xong');
});
};

function sortNumber(a, b) {
  return a - b;
}

module.exports.getGraph = function (req, res, next) {
  Graph.find({}, function (err, result) {
    if (err) console.log(err);
    else res.json(result);
  })
}
