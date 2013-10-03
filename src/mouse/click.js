'use strict';

(function() {

    Stimuli.mouse.Click = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var Click = Stimuli.mouse.Click;

    Stimuli.core.Class.mix(Click, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Click, Stimuli.mouse.Helper);

    Click.prototype.execute = function(done) {

        var self = this,
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

            var element = target,
                searchForm = false,
                tagName = null,
                action = null,
                href = null,
                hash = null,
                form = null,
                type = null;

            while(element) {
                href = element.getAttribute('href');
                tagName = element.tagName.toLowerCase();
                type = element.getAttribute('type');
                action = element.getAttribute('action');
                if (searchForm && tagName === 'form' && action) {
                    form = element;
                    break;
                }
                if (href) {
                    hash = href.split('#')[1];
                    break;
                }
                if (tagName === 'input' && type === 'submit') {
                    searchForm = true;
                }
                element = element.parentNode;
            }

            if (href || hash || form) {
                // click doesn't fire on the window in ie8 but on the document.
                var isIE8 = Stimuli.core.Support.isIE8,
                    win = self.viewport.getWindow(),
                    observer = new Stimuli.event.Observer(isIE8 ? win.document : win);

                observer.subscribe('click', function(e) {
                    observer.unsubscribeAll();
                    var canceled = isIE8 ? e.returnValue === false : e.defaultPrevented;

                    if (!canceled) {
                        if (hash) {
                            win.location.hash = hash;
                        } else if (href) {
                            if (!isIE8) {
                                win.location.href = href;
                            } else {
                                // ie8 doesn't handle relative href let's forge it
                                var match = win.location.href.match(/[^\/]*$/),
                                    prefix = '';
                                if (!/:\/\//.test(href)) {
                                    prefix =  win.location.href;
                                }
                                if (match) {
                                    prefix = prefix.replace(match[0], '');
                                }

                                win.location.href = prefix + href;
                            }
                        } else if (form) {
                            form.submit();
                        }

                        if (!isIE8) { // ie8 does not trigger automatically a link load
                            e.preventDefault();
                        }  else {
                            e.returnValue = false;
                        }
                    }
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
            self.viewport.waitForReady(done);
        });

    };

})();