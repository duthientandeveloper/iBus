angular.module('iBus', ['ngRoute','leaflet-directive']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.when('/routeStation', {
			templateUrl: 'views/routeStation.view.html',
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
