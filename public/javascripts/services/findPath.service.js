angular
	.module('iBus')
	.factory('findPath', findPath);

function findPath($http) {
	var listPath = function(start,end) {
		return $http.get('/api/findPath?start='+start+'&end='+end);
	};
	return {
		listPath: listPath
	};
}