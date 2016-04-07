angular
	.module('iBus')
	.directive('navigation', navigation);

function navigation() {
	return {
		restrict: 'EA',
		templateUrl: '/views/navigation.template.html'
	};
}
