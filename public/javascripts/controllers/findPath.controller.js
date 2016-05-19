angular
    .module('iBus')
    .controller('findPathCtrl', findPathCtrl);

function findPathCtrl($scope, $log, $mdMedia, $window, getGraph) {
    $scope.width = '100%';
    $scope.stateSideNav = $mdMedia('gt-md');
    $scope.isLoading = false;
    $scope.staionIdStart = null;
    $scope.staionIdEnd = null;
    $scope.markers = [];
    $scope.paths = {};
    $scope.focus = {
        lat: 10.755769,
        lng: 106.713852,
        zoom: 14
    };
    $scope.loadStaion = () => {
		if (!$scope.routes) {
			return getGraph.listGraph()
				.success((data) => {
					$scope.stations = data;
				})
				.error((error) => {
					$scope.message = error;
				});
		} else
			return $scope.stations;
	};
    $scope.findPath=function () {
        if($scope.staionIdStart!=null&&staionIdEnd!=null){
            
        }else{
            $window.alert('Chon tram');
        }
    }
}