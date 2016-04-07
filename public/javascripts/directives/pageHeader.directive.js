angular
	.module('iBus')
	.directive('pageHeader', pageHeader);

function pageHeader() {
	return {
		restrict: 'EA',
		scope: {
			content: '=content'
		},
		templateUrl: '/views/pageHeader.template.html'
	};
}
