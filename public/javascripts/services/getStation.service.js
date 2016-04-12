angular
	.module('iBus')
	.factory('getStation', getStation);

function getStation($http) {
	var listStation = function(id) {
		return $http.get('/api/station?id='+id+'&isgo=1');
	};
	return {
		listStation: listStation
	};
}