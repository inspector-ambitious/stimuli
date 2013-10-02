'use strict';

(function() {

    Stimuli.mouse.click = Stimuli.core.Class.inherit(Stimuli.shared.Interaction);

    var click = Stimuli.mouse.click;

    Stimuli.core.Class.mix(click, Stimuli.mouse.Helper);

    click.prototype.execute = function(done) {

        var self = this,
            newUrl = null,
            newHash = null,
            target, position;

        return self

        .configure(function() {

            self.options.button = 'left';

            target = self.getTarget();

            if (target === null) {
                throw new Error('Stimuli.mouse.click: invalid target.');
            }

            position = self.calculateViewportCoordinates(target, self.options);

            if (position === null) {
                throw new Error('Stimuli.mouse.click: invalid position.');
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
                throw 'Stimuli.mouse.click: target disappeared on mousedown.';
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
                throw 'Stimuli.mouse.click: target disappeared on mouseup.';
            }

            var element = target;
            while(element) {
                if (element.href) {
                    newHash = element.href.split('#')[1];
                    newUrl = element.href;
                    break;
                }
                element = element.parentNode;
            }

            if (newUrl && !Stimuli.core.Support.isIE8) {
                var windowObserver = new Stimuli.event.Observer(self.viewport.getWindow());
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


        .then(function() {
            if (newHash) {
                self.viewport.updateHash(newHash);
            } else if (newUrl) {
                self.viewport.updateUrl(newUrl);
            }
            self.viewport.waitForReady(done);
        });

    };

})();