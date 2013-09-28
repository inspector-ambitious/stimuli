'use strict';

/**
 * @private
 * @class Stimuli.view.event.synthetizer.Mouse
 * @singleton
 * Abstraction layer for cross-browsers synthetic mouse events injection. 
 */
(function() {
   
    Stimuli.view.event.synthetizer.Mouse = {
 
        /**
         * Injects an a synthetic mouse event into the dom.
         * @param {Object} eventConfig The mouse event configuration
         */

        inject: function(eventConfig) {
            var event,
                canceled;

            if (Stimuli.core.Support.documentCreateEvent) { // IE9+, Safari, PhantomJS, Firefox, Chrome
                
                event = eventConfig.view.document.createEvent('MouseEvents');

                event.initMouseEvent(
                    eventConfig.type,
                    eventConfig.bubbles,
                    eventConfig.cancelable,
                    eventConfig.view,
                    eventConfig.detail,
                    eventConfig.screenX,
                    eventConfig.screenY,
                    eventConfig.clientX,
                    eventConfig.clientY,
                    eventConfig.ctrlKey,
                    eventConfig.altKey,
                    eventConfig.shiftKey,
                    eventConfig.metaKey,
                    eventConfig.button,
                    eventConfig.relatedTarget || null //IE 9 throw and "Invalid Argument" Error if this property is undefined so just in case
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

                    // A possible hack to force an event to not be cancelable
                    // we could set the returnValue to readonly...
                    // But don't think it's a good idea to do that. 
                    // Leaving this commented code for now.
                    // if (!eventConfig.cancelable) {
                    //     Object.defineProperty( e, 'returnValue', {
                    //         get: function () {
                    //             return undefined;
                    //         }
                    //     });
                    // }

                    if (currentListener) {
                        currentListener.apply(this);
                    } else {
                        eventConfig.target[eventName] = null;
                    }
                };
    
                event = eventConfig.view.document.createEventObject();
                event.detail = eventConfig.detail;
                event.screenX = eventConfig.screenX;
                event.screenY = eventConfig.screenY;
                event.clientX = eventConfig.clientX;
                event.clientY = eventConfig.clientY;
                event.ctrlKey = eventConfig.ctrlKey;
                event.altKey = eventConfig.altKey;
                event.shiftKey = eventConfig.shiftKey;
                event.metaKey = eventConfig.metaKey;
                event.button = eventConfig.button;

                // TODO: the real event flow should be investigated
                // see http://www.quirksmode.org/js/events_mouse.html#relatedtarget
                if (eventConfig.relatedTarget) {
                    if (eventName === 'onmouseover') {
                        event.fromElement = eventConfig.relatedTarget;
                        event.toElement = eventConfig.target;
                    }

                    if (eventName === 'onmouseout') {
                        event.fromElement = eventConfig.target;
                        event.toElement = eventConfig.relatedTarget;
                    }

                }

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
