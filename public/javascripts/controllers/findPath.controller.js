angular
    .module('iBus')
    .controller('findPathCtrl', findPathCtrl);

function findPathCtrl($scope, $log, $mdMedia, $window, getGraph) {
    $scope.width = '100%';
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
			return getGraph.listGraph()
				.success((data) => {
					$scope.routes = data;
				})
				.error((error) => {
					$scope.message = error;
				});
		} else
			return $scope.routes;
	};
}