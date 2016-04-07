angular
	.module('iBus')
	.directive('footerGeneric', footerGeneric);

function footerGeneric() {
	return {
		restrict: 'EA',
		templateUrl: '/views/footerGeneric.template.html '
	};
}
