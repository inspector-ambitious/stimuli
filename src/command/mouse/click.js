'use strict';

(function() {

    Stimuli.command.mouse.click = Stimuli.core.Class.inherit(Stimuli.command.Generic);

    var click = Stimuli.command.mouse.click;

    Stimuli.core.Class.mix(click, Stimuli.command.mouse.Helper);

    click.prototype.execute = function(callback) {
        var self = this,
            newLocation = null,
            newHash = null,
            target, position;

        return self

        .configure(function() {
            self.options.button = 'left';

            target = self.getTarget();

            if (target === null) {
                throw 'Stimuli.command.mouse.click: ' + self.error.invalidTarget;
            }

            position = self.calculateViewportCoordinates(target, self.options.offset);

            if (position === null) {
                throw 'Stimuli.command.mouse.click: ' + self.error.invalidPosition;
            }

        })

        .inject(function() {

            return {
                type: 'mousedown',
                button: self.getButton(),
                bubbles: true,
                cancelable: true,
                altKey: self.options.alt,
                ctrlKey: self.options.ctrl,
                shiftKey: self.options.shift,
                metaKey: self.options.meta,
                detail: 1,
                target: target,
                clientX: position.clientX,
                clientY: position.clientY,
                screenX: position.screenX,
                screenY: position.screenY
            };

         })

        .then(function() {
            if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                throw 'Stimuli.command.mouse.click: target disappeared on mousedown.';
            }
        })

        .inject(function() {

            return {
                type: 'mouseup',
                button: self.getButton(),
                bubbles: true,
                cancelable: true,
                altKey: self.options.alt,
                ctrlKey: self.options.ctrl,
                shiftKey: self.options.shift,
                metaKey: self.options.meta,
                detail: 1,
                target: target,
                clientX: position.clientX,
                clientY: position.clientY,
                screenX: position.screenX,
                screenY: position.screenY
            };

        }, 100)

        .then(function() {
            if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                throw 'Stimuli.command.mouse.click: target disappeared on mouseup.';
            }


            var element = target;
            while(element) {
                if (element.href) {
                    newHash = element.href.split('#')[1];
                    newLocation = element.href;
                    break;
                }
                element = element.parentNode;
            }

            if (newLocation && !Stimuli.core.Support.isIE8) {
                var windowObserver = new Stimuli.view.event.Observer(self.viewport.getWindow());
                windowObserver.subscribe('click', function(e) {
                    if (typeof e.preventDefault === 'function') {
                        e.preventDefault();
                    }
                    windowObserver.unsubscribeAll();
                });
            }

        })


        .inject(function() {

            return {
                type: 'click',
                button: self.getButton(),
                bubbles: true,
                cancelable: true,
                altKey: !!self.options.alt,
                ctrlKey: !!self.options.ctrl,
                shiftKey: !!self.options.shift,
                metaKey: !!self.options.meta,
                detail: 1,
                target: target,
                clientX: position.clientX,
                clientY: position.clientY,
                screenX: position.screenX,
                screenY: position.screenY
            };

        }, 1)

        .finish(function(events) {

            function waitForWindow() {
                if (self.viewport.getWindow()) {
                    if (callback) {
                        callback(events);
                    }
                    return;
                }
                setTimeout(waitForWindow, 1);
            }

            if (newHash) {
                self.viewport.getWindow().hash = newHash;
            } else if (newLocation) {
                self.viewport.getWindow().location = newLocation;
                self.viewport.setWindow(null);
            }

            waitForWindow();
        });

    };

})();