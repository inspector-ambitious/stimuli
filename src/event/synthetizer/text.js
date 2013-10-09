'use strict';

/**
 * @class Stimuli.event.synthetizer.Text
 * @singleton
 * Abstraction layer for TextEvent injection  (only IE9+ and webkit)
 */
(function() {

    Stimuli.event.synthetizer.Text = {

        /**
         * Injects an a synthetic keyboard event into the dom.
         * @param {Object} eventConfig The keyboard event configuration
         */

        inject: function(eventConfig) {
            var event,
                canceled;

            if (Stimuli.core.Support.documentCreateEvent) {

                event = eventConfig.view.document.createEvent('TextEvent');

                if (Stimuli.core.Support.isWebkit) {
                    event.initTextEvent(
                        eventConfig.type,
                        eventConfig.bubbles,
                        eventConfig.cancelable,
                        eventConfig.view,
                        eventConfig.key
                    );

                } else if (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10) {
                    event.initTextEvent(
                        eventConfig.type,
                        eventConfig.bubbles,
                        eventConfig.cancelable,
                        eventConfig.view,
                        eventConfig.key,
                        1,
                        'en-US'
                    );


                }

                canceled = !eventConfig.target.dispatchEvent(event);

            }

            return {
                event: event,
                canceled: canceled
            };
        }
    };

})();
