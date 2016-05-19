angular
	.module('iBus')
	.factory('getGraph', getGraph);

function getGraph($http) {
	var listGraph = function() {
		return $http.get('/api/graph/');
	};
	return {
		listGraph: listGraph
	};
}