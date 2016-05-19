angular.module('iBus', ['ngRoute', 'leaflet-directive', 'ngMaterial', 'ngMessages']);

function config($routeProvider, $locationProvider, $mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('indigo')
		.accentPalette('teal');
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.view.html',
			controller: 'LeftCtrl'
		})
		.when('/routeStation', {
			templateUrl: 'views/routeStation.view.html',
			controller: 'routeStationCtrl'
		})
		.when('/findPath',{
			templateUrl:'views/findPath.view.html',
			controller:'findPathCtrl'
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
	.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', config]);