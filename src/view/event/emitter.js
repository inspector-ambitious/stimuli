'use strict';

/**
 * @class Stimuli.view.event.Emitter
 * @singleton
 * Provides an abstraction layer to routes events to their corresponding synthetizers.
 */
(function() {
    
    var synthetizer = Stimuli.view.event.synthetizer;

    Stimuli.view.event.Emitter = {

        /**
         * Determines if an event is a mouse event
         * @param {String} eventType The event type
         * @return {Boolean} True if it's a mouse event
         */
        isMouseEvent: function(eventType) {
            return {
                click: true,
                mousedown: true,
                mouseup: true,
                dblclick: true,
                mouseover: true,
                mousemove: true,
                mouseout: true,
                mouseleave: true,
                mouseenter: true,
                contextmenu: true
            }[eventType] || false;
        },

        /**
         * Emits the event and call the callback function
         * @param {Object} data The event configuration
         * @param {Function} callback The callback function to be called after the invent is injected.
         */
        emit: function(data, callback) {
            var result;

            if (this.isMouseEvent(data.type)) {
                result = synthetizer.Mouse.inject(data);
            }

            callback(result.event, result.canceled);
        }

    };


})();