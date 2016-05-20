angular
    .module('iBus')
    .controller('findPathCtrl', findPathCtrl);

function findPathCtrl($scope, $log, $mdMedia, $window, getGraph, findPath) {
    $scope.width = '100%';
    var polPaths = [];
    $scope.stateSideNav = $mdMedia('gt-md');
    $scope.isLoading = false;
    $scope.staionIdStart = null;
    $scope.staionIdEnd = null;
    $scope.markers = [];
    $scope.paths = {};
    $scope.findPath = false;
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
    $scope.findPath = function () {
        if ($scope.staionIdStart !== null && $scope.staionIdEnd !== null) {
                findPath.listPath($scope.staionIdStart,$scope.staionIdEnd)
                    .success((data) => {
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
                            console.log(data[i].polyline)
                            if (data[i].polyline.length !== 0) {
                                
                                for (var j = 0; j < data[i].polyline.length-1; j++) {
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
                    })
                    .error((error) => {
                        $scope.message = error;
                    });
        } else {
            $window.alert('Chon tram');
        }
    }
}