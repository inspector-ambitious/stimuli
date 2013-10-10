'use strict';

/**
 * @class Stimuli.event.synthetizer.Keyboard
 * @singleton
 * Abstraction layer for cross-browsers synthetic keyboard events injection.
 */
(function() {

    Stimuli.event.synthetizer.Keyboard = {

        /**
         * Injects an a synthetic keyboard event into the dom.
         * @param {Object} eventConfig The keyboard event configuration
         */

        // TODO: (yhwh) check location, key and keyIdentifier
        inject: function(eventConfig) {
            var event,
                canceled,
                modifiers = eventConfig.modifiers,
                alt = /Alt/.test(modifiers),
                shift = /Shift/.test(modifiers),
                control =/Control/.test(modifiers),
                meta = /Meta/.test(modifiers),
                altGraph = /AltGraph/.test(modifiers),
                keyCode = eventConfig.key.charCodeAt(0);

            if (Stimuli.core.Support.documentCreateEvent) { // IE9+, Safari, PhantomJS, Firefox, Chrome

                if (Stimuli.core.Support.isWebkit) {
                    // see https://bugs.webkit.org/show_bug.cgi?id=16735
                    event = eventConfig.view.document.createEvent('Event');
                    event.initEvent(
                        eventConfig.type,
                        eventConfig.bubbles,
                        eventConfig.cancelable,
                        eventConfig.view
                    );
                    event.ctrlKey = control;
                    event.altKey = alt;
                    event.shiftKey = shift;
                    event.metaKey = meta;
                    event.keyCode = keyCode;
                    event.charCode = eventConfig.type === 'keypress' ? keyCode : 0;
                    event.location = 0;
                    event.keyIdentifier = eventConfig.key;
                    event.which = keyCode;

                } else if (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11) {

                    event = eventConfig.view.document.createEvent('KeyboardEvent');
                    event.initKeyboardEvent(
                        eventConfig.type,
                        eventConfig.bubbles,
                        eventConfig.cancelable,
                        eventConfig.view,
                        eventConfig.key,
                        0,
                        eventConfig.modifiers,
                        1,
                        'en-US'
                    );



                    // Setting read-only properties for legacy (initKeyboardEvent doesn't update them)
                    Object.defineProperty(event, 'keyCode', {
                        get: function() {
                            return keyCode;
                        }
                    });


                    if (eventConfig.type === 'keypress') {
                        Object.defineProperty(event, 'charCode', {
                            get: function() {
                                return keyCode;
                            }
                        });
                    }

                    Object.defineProperty(event, 'which', {
                        get: function() {
                            return keyCode;
                        }
                    });



                } else if (Stimuli.core.Support.isGecko) {
                    event = eventConfig.view.document.createEvent('KeyboardEvent');
                    event.initKeyEvent(
                        eventConfig.type,
                        eventConfig.bubbles,
                        eventConfig.cancelable,
                        eventConfig.view,
                        control,
                        alt,
                        shift,
                        meta,
                        eventConfig.key.charCodeAt(0),
                        eventConfig.key.charCodeAt(0)
                    );
                }

                canceled = !eventConfig.target.dispatchEvent(event);

            } else {

                var eventName = 'on' + eventConfig.type;
                // Regardless of their values specified in the event object,
                // cancelBubble is automatically initialized by fireEvent.
                // (see http://msdn.microsoft.com/en-us/library/ie/ms536423(v=vs.85).aspx)
                // So to bypass this limitation we create a listener which will be binded expando style,
                // this way it will be fired before any other listener and the cancelBubble can be fixed.

                var currentListener = eventConfig.target[eventName];

                eventConfig.target[eventName] = function() {
                    var e = eventConfig.view.event;

                    e.cancelBubble = !eventConfig.bubbles;

                    if (currentListener) {
                        currentListener.apply(this);
                    } else {
                        eventConfig.target[eventName] = null;
                    }
                };

                event = eventConfig.view.document.createEventObject();

                event.ctrlKey = control;
                event.altKey = alt;
                event.shiftKey = shift;
                event.metaKey = meta;
                event.keyCode = keyCode;


                eventConfig.target.fireEvent(eventName, event);
                canceled = event.returnValue === false;
            }

            return {
                event: event,
                canceled: canceled
            };
        }
    };

})();
