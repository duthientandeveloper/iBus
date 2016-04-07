angular
	.module('iBus')
	.controller('routeStationCtrl', routeStationCtrl);

function routeStationCtrl($scope, $log, getRoute, getStop) {
	var polPaths = [];
	$scope.markers = [];
	$scope.paths = {};
	$scope.stations ={};
	$scope.london = {
		lat: 10.755769,
		lng: 106.713852,
		zoom: 14
	};
	getRoute.listRoute()
		.success(function(data) {
			$scope.routes = data;
			$scope.selectedRoute = data[0];
			$scope.updateRoute($scope.selectedRoute.Id);
		})
		.error(function(error) {
			$scope.message = error;
		});
	$scope.updateRoute = function(id) {
		getStop.listStop(id)
			.success(function(data) {
				$scope.stations = data;
				$scope.selectedStation = data[0];
				$scope.removeMarkers();
				polPaths = [];
				for (var i = 0; i < data.length; i++) {
					$scope.london = {
						lat: data[0].Station.Lat,
						lng: data[0].Station.Lng,
						zoom: 14
					};
					$scope.markers.push({
						lat: data[i].Station.Lat,
						lng: data[i].Station.Lng,
						message: data[i].Station.Name,
						focus: false
					});
					if (data[i].PolyLine !== null) {
						var tmp = [];
						tmp = polyline.decode(data[i].PolyLine);
						for (var j = 0; j < tmp.length; j++) {
							polPaths.push({
								lat: tmp[j][1],
								lng: tmp[j][0]
							});
						}

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
				$scope.updateStation($scope.selectedStation.Order);
			})
			.error(function(error) {
				$scope.message = error;
			});
	};
	$scope.removeMarkers = function() {
		$scope.markers = [];
	};
	$scope.updateStation = function(id) {
		$scope.london = {
			lat: $scope.stations[id].Station.Lat,
			lng: $scope.stations[id].Station.Lng,
			zoom: 14
		};
		for (var i = 0; i < $scope.markers.length; i++) {
			if ($scope.markers[i].focus) {
				$scope.markers[i].focus=false;
			}
		}
		$scope.markers[id].focus=true;

	};

}
