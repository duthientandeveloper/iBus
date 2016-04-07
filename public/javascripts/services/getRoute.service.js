angular
	.module('iBus')
	.factory('getRoute', getRoute);

function getRoute($http) {
	var listRoute = function() {
		return $http.get('/api/routes/');
	};
	return {
		listRoute: listRoute
	};
}