angular
	.module('iBus')
	.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
		$scope.close = function() {
			$scope.mess ="Hello";
		};
	});