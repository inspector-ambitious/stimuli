function MainCtrl($scope, $http, $location) {

    // Load Package
    $http.get('package.json')
    .then(function(res){
        $scope.package = res.data;
    });

    // Load templates
    $http.get('resources/templates.json')
    .then(function(res){
        $scope.templates = res.data;
        $scope.template = $scope.templates[0];
    });

    // Retrieve templates url
    $scope.getTemplateUrl = function() {

        if ($scope.template) {
            return '../templates/' + $scope.template.url;
        }
        return '';

    };

    $scope.domEvents = [
        { name: 'blur', watch: true },
        { name: 'change', watch: true },
        { name: 'click', watch: true },
        { name: 'contextmenu', watch: true },
        { name: 'copy', watch: true },
        { name: 'cut', watch: true },
        { name: 'dblclick', watch: true },
        { name: 'error', watch: true },
        { name: 'focus', watch: true },
        { name: 'focusin', watch: true },
        { name: 'focusout', watch: true },
        { name: 'hashchange', watch: true },
        { name: 'keydown', watch: true },
        { name: 'keypress', watch: true },
        { name: 'keyup', watch: true },
        { name: 'load', watch: true },
        { name: 'mousedown', watch: true },
        { name: 'mouseenter', watch: true },
        { name: 'mouseleave', watch: true },
        { name: 'mousemove', watch: true },
        { name: 'mouseout', watch: true },
        { name: 'mouseover', watch: true },
        { name: 'mouseup', watch: true },
        { name: 'mousewheel', watch: true },
        { name: 'paste', watch: true },
        { name: 'reset', watch: true },
        { name: 'resize', watch: true },
        { name: 'scroll', watch: true },
        { name: 'select', watch: true },
        { name: 'submit', watch: true },
        { name: 'textinput', watch: true },
        { name: 'unload', watch: true },
        { name: 'wheel', watch: true }
    ];

    // Browser logging
    $scope.console = false;

    // Selector
    $scope.selector = '.testme';

    $scope.watch = false;

    var watchedElements = [];

    $scope.watchedEvents = [];

    function updateEventsList(event) {

        formattedEvent = {
            hideDetails: true,
            type: event.type,
            targetTag: (event.target.tagName + '').toLowerCase(),
            bubbles: event.bubbles,
            detail: event.detail,
            screenX: event.screenX,
            screenY: event.screenY,
            clientX: event.clientX,
            clientY: event.clientY,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            shiftKey: event.shiftKey,
            button: event.button,
            keyCode: event.keyCode,
            defaultPrevented: event.defaultPrevented
        };

        if (event instanceof MouseEvent) {
            formattedEvent.className = 'MouseEvent';
        }

        if (event.target.id) {
            formattedEvent.targetId = '#' + event.target.id;
        }

        if (event.target.className) {
            formattedEvent.targetCls = '.' + event.target.className.replace(/\s/g, '.');
        }

        $scope.watchedEvents.push(formattedEvent);
        $scope.$apply();

        if ($scope.console) {
            console.log(event);
        }
    }


    $scope.startCapture = function() {
        if ($scope.watch) {
            
            if (watchedElements.length > 0) {
                console.log('uh');
            }

            $($scope.selector).each(function(idx, el) {
                var domEvents = $scope.domEvents,
                    length  = domEvents.length,
                    i = 0,
                    domEvent;

                dominoElement = new Domino.core.Element(el);
                watchedElements.push(dominoElement);

                for (; i < length; i++) {
                    domEvent = domEvents[i];
                    if (domEvent.watch) {
                        dominoElement.addListener(domEvent.name, updateEventsList);
                    }
                }

            });
        }
    }

    $scope.stopCapture = function() {
        var length = watchedElements.length,
            i = 0;

        for(; i < length; i++) {
            watchedElements[i].removeAllListeners();
        }

        watchedElements = [];
    }

    $scope.resetCapture = function(force) {
        $scope.stopCapture();
        $scope.startCapture();
    }


    $scope.toggleCapture = function() {
        var watch = !$scope.watch;
        $scope.watch = watch;
        watch ? $scope.startCapture() : $scope.stopCapture();
    };

    $scope.filterWatchedEvent = function(event) {
        var filteredEvent = {};

        for (var prop in event) {
            if (event.hasOwnProperty(prop) && 
                prop !== 'className' && 
                prop !== 'hideDetails') {
                filteredEvent[prop] = event[prop];
            }
            
        }
        return filteredEvent;
    }

}