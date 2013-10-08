'use strict';

/**
 * @class Stimuli.event.Emitter
 * @singleton
 * Provides an abstraction layer to routes events to their corresponding synthetizers.
 */
(function() {
    
    var synthetizer = Stimuli.event.synthetizer;

    Stimuli.event.Emitter = {

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
         * Determines if an event is a keyboard event
         * @param {String} eventType The event type
         * @return {Boolean} True if it's a keyboard event
         */
        isKeyboardEvent: function(eventType) {
            return {
                keyup: true,
                keydown: true,
                keypress: true,
                textInput: true,
                textinput: true,
                input: true
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
            else if (this.isKeyboardEvent(data.type)) {
                result = synthetizer.Keyboard.inject(data);
            }

            callback(result.event, result.canceled);
        }

    };


})();