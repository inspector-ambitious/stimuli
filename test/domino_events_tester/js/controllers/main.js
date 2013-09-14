function MainCtrl($scope, $http, $location, $templateCache) {

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
        { name: 'blur', capture: false },
        { name: 'change', capture: false },
        { name: 'click', capture: false },
        { name: 'contextmenu', capture: false },
        { name: 'copy', capture: false },
        { name: 'cut', capture: false },
        { name: 'dblclick', capture: false },
        { name: 'error', capture: false },
        { name: 'focus', capture: false },
        { name: 'focusin', capture: false },
        { name: 'focusout', capture: false },
        { name: 'hashchange', capture: false },
        { name: 'keydown', capture: false },
        { name: 'keypress', capture: false },
        { name: 'keyup', capture: false },
        { name: 'load', capture: false },
        { name: 'mousedown', capture: false },
        { name: 'mouseenter', capture: false },
        { name: 'mouseleave', capture: false },
        { name: 'mousemove', capture: false },
        { name: 'mouseout', capture: false },
        { name: 'mouseover', capture: false },
        { name: 'mouseup', capture: false },
        { name: 'mousewheel', capture: false },
        { name: 'paste', capture: false },
        { name: 'reset', capture: false },
        { name: 'resize', capture: false },
        { name: 'scroll', capture: false },
        { name: 'select', capture: false },
        { name: 'submit', capture: false },
        { name: 'textinput', capture: false },
        { name: 'unload', capture: false },
        { name: 'wheel', capture: false }
    ];

    $scope.selectAllDomEvents = function() {
       var domEvents = $scope.domEvents,
            length  = domEvents.length,
            i = 0;

        for (; i < length; i++) {
            domEvents[i].capture = true;
        }
    };

    $scope.deselectAllDomEvents = function() {
        var domEvents = $scope.domEvents,
            length  = domEvents.length,
            i = 0;

        for (; i < length; i++) {
            domEvents[i].capture = false;
        }
    };

    // Browser logging
    $scope.console = false;

    // Selector
    $scope.selector = '.testme';

    $scope.capture = false;

    var capturedElements = [];

    $scope.capturedEvents = [];

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

        $scope.capturedEvents.push(formattedEvent);
        $scope.$apply();

        if ($scope.console) {
            console.log(event);
        }
    }


    $scope.startCapture = function() {
        if ($scope.capture) {
            
            if (capturedElements.length > 0) {
                console.log('uh');
            }

            $($scope.selector).each(function(idx, el) {
                var domEvents = $scope.domEvents,
                    length  = domEvents.length,
                    i = 0,
                    domEvent;

                dominoElement = new Domino.core.Element(el);
                capturedElements.push(dominoElement);

                for (; i < length; i++) {
                    domEvent = domEvents[i];
                    if (domEvent.capture) {
                        dominoElement.addListener(domEvent.name, updateEventsList);
                    }
                }

            });
        }
    }

    $scope.clearCapturedEvents = function() {
        $scope.capturedEvents = [];
        // $scope.$apply();
    };

    $scope.stopCapture = function() {
        var length = capturedElements.length,
            i = 0;

        for(; i < length; i++) {
            capturedElements[i].removeAllListeners();
        }

        capturedElements = [];
    }

    $scope.resetCapture = function(force) {
        $scope.stopCapture();
        $scope.startCapture();
    }


    $scope.toggleCapture = function() {
        var capture = !$scope.capture;
        $scope.capture = capture;
        capture ? $scope.startCapture() : $scope.stopCapture();
    };

    $scope.filterCapturedEvent = function(event) {
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

    $scope.reloadTemplate = function() {

        var templates = $scope.templates,
            length = templates.length,
            i = 0;
        
        for (; i < length; i++) {
            if ($scope.template === templates[i]) {
                break;
            }
        }

        $templateCache.remove($scope.getTemplateUrl());
        $scope.template = null;

        setTimeout(function() {
            $scope.template = $scope.templates[i];
            $scope.$apply();
        }, 1);

    }

}