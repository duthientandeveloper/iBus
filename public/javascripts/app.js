angular.module('iBus', ['ngRoute','leaflet-directive','ngMaterial','ngMessages']);

function config($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.view.html',
			controller: 'LeftCtrl'
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
