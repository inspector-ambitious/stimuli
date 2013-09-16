'use strict';

(function(app) {

App.directive('tAutoScroll', function() {
    return {
        
        restrict: 'A',

        link: function($scope, $elements) {
            
            var previousChildCounts = 0;

            function autoScroll(el) {
                var currentChildCounts = el.childNodes.length;
                if (currentChildCounts > previousChildCounts && // autoScroll only if there is new childNodes
                    el.scrollHeight > el.clientHeight) {
                    previousChildCounts = currentChildCounts;
                    el.scrollTop = el.scrollHeight;
                }
            }

            $scope.$watch(function() {
                var length = $elements.length,
                    i = 0;
                for (; i < length; i++) {
                    autoScroll($elements[i])
                }    
                
            });
        }
    };
});

})(App);