'use strict';

/**
 * @class Stimuli.event.synthetizer.Html
 * @singleton
 * Abstraction layer for cross-browsers synthetic html events injection.
 */
(function() {

    Stimuli.event.synthetizer.Html = {

        /**
         * Injects an a synthetic html event into the dom.
         * @param {Object} eventConfig The html event configuration
         */

        inject: function(eventConfig) {
            var event,
                canceled;

            if (Stimuli.core.Support.documentCreateEvent) { // IE9+, Safari, PhantomJS, Firefox, Chrome

                event = eventConfig.view.document.createEvent('Event');

                event.initEvent(
                    eventConfig.type,
                    eventConfig.bubbles,
                    eventConfig.cancelable,
                    eventConfig.view
                );

                canceled = !eventConfig.target.dispatchEvent(event);

            } else { //IE8

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
