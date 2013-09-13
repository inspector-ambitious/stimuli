function TesterCtrl($scope, $http, $location) {

    // Load Fixtures
    $http.get('resources/fixtures.json')
    .then(function(res){
        $scope.fixtures = res.data;                
    });

    // Retrieve fixtures url
    $scope.getFixtureUrl = function() {

        if ($scope.fixture) {
            return '../fixtures/' + $scope.fixture.url;
        }

        return '';
    };

    $scope.domEvents = [
        {name: 'blur', observed: true},
        {name: 'change', observed: true},
        {name: 'click', observed: true},
        {name: 'contextmenu', observed: true},
        {name: 'copy', observed: true},
        {name: 'cut', observed: true},
        {name: 'dblclick', observed: true},
        {name: 'error', observed: true},
        {name: 'focus', observed: true},
        {name: 'focusin', observed: true},
        {name: 'focusout', observed: true},
        {name: 'hashchange', observed: true},
        {name: 'keydown', observed: true},
        {name: 'keypress', observed: true},
        {name: 'keyup', observed: true},
        {name: 'load', observed: true},
        {name: 'mousedown', observed: true},
        {name: 'mouseenter', observed: true},
        {name: 'mouseleave', observed: true},
        {name: 'mousemove', observed: true},
        {name: 'mouseout', observed: true},
        {name: 'mouseover', observed: true},
        {name: 'mouseup', observed: true},
        {name: 'mousewheel', observed: true},
        {name: 'paste', observed: true},
        {name: 'reset', observed: true},
        {name: 'resize', observed: true},
        {name: 'scroll', observed: true},
        {name: 'select', observed: true},
        {name: 'submit', observed: true},
        {name: 'textinput', observed: true},
        {name: 'unload', observed: true},
        {name: 'wheel', observed: true}
    ];

    // Browser logging
    $scope.console = true;

    // Selector
    $scope.selector = '.testme';

    // Toggle events observation
    var observe_button_text = {
        true:  'Stop!',
        false: 'Observe all events'
    };

    $scope.observe = false;
    $scope.observe_button_text = observe_button_text[$scope.observe];

    $scope.toggleObserve = function() {

        $scope.observe = !$scope.observe;

        $scope.observe_button_text = observe_button_text[$scope.observe];


    };

}