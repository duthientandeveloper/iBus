angular
	.module('iBus')
	.controller('homeCtrl', homeCtrl);

function homeCtrl($scope) {
	var vm = this;
	vm.pageHeader = {
		title: 'iBus'
	};
}