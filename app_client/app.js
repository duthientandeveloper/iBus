angular.module('iBus', ['ngRoute', 'leaflet-directive']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.when('/routeStation', {
			templateUrl: 'routeStation/routeStation.view.html',
			controller: 'routeStationCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}
angular
	.module('iBus')
	.config(['$routeProvider', '$locationProvider', config]);