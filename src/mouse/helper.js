'use strict';

(function() {

    Stimuli.mouse.Helper = {

        parseOptions: function() {
            var self = this,
                args = self.args;
            self.options = {};
            if (typeof args[0] === 'string') {
                self.options.target = args[0];
            } else {
                var i = 0,
                    length = args.length,
                    prop, arg;

                for (i = 0; i < length; i++) {
                    Stimuli.core.Object.merge(self.options, args[i]);
                }
            }
        },

        getTarget: function() {
            var viewport = this.viewport,
                target = this.options.target;

            if (target) {
                if (typeof target === 'function') {
                    return target() || null;
                } else if (typeof target === 'string') {
                    return viewport.$(target) || null;
                } else if (target.nodeType === 1) { // is an HTMLElement ?
                    return target || null;
                } else if (!isNaN(target.x) && !isNaN(target.y)) {
                    return viewport.getVisibleElementAt(target.x, target.y);
                }
            }

            return null;
        },

        handleClick: function(element) {
            var searchForm = false,
                win = this.viewport.getWindow(),
                tagName = null,
                action = null,
                href = null,
                hash = null,
                form = null,
                type = null;

            while(element !== win.document.body) {
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
                    isIE9 = Stimuli.core.Support.isIE9,
                    isIE10 = Stimuli.core.Support.isIE10,
                    observer = new Stimuli.event.Observer(isIE8 ? win.document : win);

                observer.subscribe('click', function(e) {
                    observer.unsubscribeAll();
                    var canceled = isIE8 ? e.returnValue === false : e.defaultPrevented;

                    if (!canceled) {
                        if (hash) {
                            win.location.hash = hash;
                        } else if (href) {
                            if (!isIE8 && !isIE9 && !isIE10) {
                                win.location.href = href;
                            } else {
                                // ie8-10 don't handle relative href passed to window.location let's forge it
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
        },

        getButton: function() {
                
            var isIE8 = Stimuli.core.Support.isIE8,
                buttonsMap = {
                left: isIE8 ? 0 : 1,
                middle: isIE8 ? 1 : 4,
                right: 2,
                none: undefined
            };

            return buttonsMap[this.options.button || 'left']; // Default left button

        },

        isElementVisibleAt: function(element, x, y) {
            return this.viewport.getVisibleElementAt(x, y) === element;
        },

        calculateViewportCoordinates: function(element, offset) {
            var viewport = this.viewport,
                coordinates, boundingRectangle, origin, right, left, top, bottom, x, y;

            offset = offset || {};

            boundingRectangle = element.getBoundingClientRect();
            right = boundingRectangle.right;
            left = boundingRectangle.left;
            top = boundingRectangle.top;
            bottom = boundingRectangle.bottom;

            // the x offset was a percentage
            if (typeof offset.x === 'string') {
                offset.x = Math.round((right - left - 1) * (parseInt(offset.x, 10)/100));

            }
            // the y offset was a percentage
            if (typeof offset.y === 'string') {
                offset.y = Math.round((bottom - top - 1)  * (parseInt(offset.y, 10)/100));
                
            }

            // tries to find a correct x offset if it wasn't specified
            if (isNaN(offset.x)) {
                for (x = left; x < right && isNaN(offset.x); x++) {
                    for (y = top; y < bottom && isNaN(offset.x); y++) {
                        if (viewport.getVisibleElementAt(x, y) === element) {
                            offset.x = x - left;
                            offset.y = offset.y || (y - top);
                        }
                    }
                }
            }

            // tries to find a valid y offset if it wasn't specified
            if (isNaN(offset.y)) {
                for (y = top; y < bottom && isNaN(offset.y); y++) {
                    for (x = left; x < right && isNaN(offset.y); x++) {
                        if (viewport.getVisibleElementAt(x, y) === element) {
                            offset.y = y - top;
                        }
                    }
                }
            }

            // translates origin of offset coordinates to the top left corner
            if (offset.origin) {
                switch(offset.origin) {
                    case 'bl':
                        offset = {
                            x: offset.x,
                            y: (bottom - top - 1) + offset.y
                        };
                        break;
                    case 'tr':
                        offset = {
                            x: (right - left - 1) + offset.x,
                            y: offset.y
                        };
                        break;
                    case 'br':
                        offset = {
                            x: (right - left - 1) + offset.x,
                            y: (bottom - top - 1) + offset.y
                        };
                        break;
                }
            }
            
            coordinates = {
                clientX: left + offset.x,
                clientY: top + offset.y
            };

            coordinates.screenX = viewport.getScreenX() + coordinates.clientX;
            coordinates.screenY = viewport.getScreenY() + coordinates.clientY;

            // the coordinates is outside the targeted element
            if (viewport.getVisibleElementAt(coordinates.clientX, coordinates.clientY) !== element) {
                return null;
            }

            return coordinates;

        }
        
    };

    Stimuli.core.Object.merge(Stimuli.mouse.Helper, Stimuli.core.Chainable);
})();
