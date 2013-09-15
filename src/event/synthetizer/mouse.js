'use strict';

(function() {
   
    var ns = Domino.event.synthetizer;

    ns.Mouse = {
 
        inject: function(data) {
            var event,
                canceled;

            if (Domino.core.Support.isModern) {
                
                event = data.view.document.createEvent('MouseEvents');

                event.initMouseEvent(
                    data.name,
                    data.bubbles,
                    data.cancelable,
                    data.view,
                    data.detail,
                    data.screenX,
                    data.screenY,
                    data.clientX,
                    data.clientY,
                    data.ctrlKey,
                    data.altKey,
                    data.shiftKey,
                    data.metaKey,
                    data.button,
                    data.relatedTarget
                );

                canceled = !data.target.dispatchEvent(event);
            
            } else {
            
                event = data.view.document.createEventObject();

                event.bubbles = data.bubbles;
                event.cancelable = data.cancelable;
                event.detail = data.detail;
                event.screenX = data.screenX;
                event.screenY = data.screenY;
                event.clientX = data.clientX;
                event.clientY = data.clientY;
                event.ctrlKey = data.ctrlKey;
                event.altKey = data.altKey;
                event.shiftKey = data.shiftKey;
                event.metaKey = data.metaKey;
                event.button = data.button;
                event.relatedTarget = data.relatedTarget;
     
                canceled = !data.target.fireEvent('on'+ data.name, event);
            
            }
            
            return {
                event: event,
                canceled: canceled
            };
        }
    };

})();
