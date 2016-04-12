/*jshint esversion: 6 */
angular
	.module('iBus')
	.controller('routeStationCtrl', routeStationCtrl);

function routeStationCtrl($scope, $log, $mdMedia,$window, getRoute, getStation) {
	$scope.width = '100%';
	var polPaths = [];
	$scope.stateSideNav = $mdMedia('gt-md');
	$scope.isLoading = false;
	$scope.routeId = null;
	$scope.routes = null;
	$scope.stationSelected = null;
	$scope.stations = null;
	$scope.markers = [];
	$scope.paths = {};
	$scope.focus = {
		lat: 10.755769,
		lng: 106.713852,
		zoom: 14
	};
	$scope.loadRoute = () => {
		if (!$scope.routes) {
			return getRoute.listRoute()
				.success((data) => {
					$scope.routes = data;
				})
				.error((error) => {
					$scope.message = error;
				});
		} else
			return $scope.routes;
	};
	$scope.$watch('routeId', function(vNew, vOld) {
		if (vNew) {
			$scope.isLoading = true;
			getStation.listStation(vNew)
				.success(function(data) {
					$scope.isLoading = false;
					$scope.stations = $scope.sortData(data);
					$scope.removeMarkers();
					$scope.insertMarkers($scope.stations);
				})
				.error(function(error) {
					$scope.message = error;
				});
		}
	});
	$scope.change = () => {
		$scope.stateSideNav = $scope.stateSideNav ? false : true;
	};
	$scope.removeMarkers = function() {
		$scope.markers = [];
		polPaths = [];
	};
	$scope.insertMarkers = function(data) {
		for (var i = 0; i < data.length; i++) {
			$scope.focus = {
				lat: data[0].lat,
				lng: data[0].lng,
				zoom: 14
			};
			$scope.markers.push({
				lat: data[i].lat,
				lng: data[i].lng,
				message: data[i].name,
				focus: false
			});
			if (data[i].polyline.length !==0) {
				for (var j = 0; j < data[i].polyline.length; j++) {
					polPaths.push({
						lat: data[i].polyline[j].lat,
						lng: data[i].polyline[j].lng
					});
				}
			}
			$scope.paths = {
					p1: {
						type: "polyline",
						color: 'red',
						weight: 3,
						latlngs: polPaths
					}
				};
		}
	};
	$scope.sortData = function(data){
		var result = new Array(data.length);
		for (var i = 0; i < data.length; i++) {
			result[data[i].oder]=data[i];
		}
		return result;
	};
}