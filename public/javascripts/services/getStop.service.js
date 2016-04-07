angular
	.module('iBus')
	.factory('getStop', getStop);

function getStop($http) {
	var listStop = function(id) {
		return $http.get('/api/stops?idroute='+id);
	};
	return {
		listStop: listStop
	};
}