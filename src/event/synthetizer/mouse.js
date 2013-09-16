'use strict';

(function() {
   
    var ns = Stimuli.event.synthetizer;

    ns.Mouse = {
 
        isCancelable: function(name) {
            return {
                click: true,
                dblclick: true,
                mousedown: true,
                mouseup: true,
            }[name] || false;
        },


        inject: function(data) {
            var cancelable = this.isCancelable(data.name),
                event,
                canceled;

            if (Stimuli.core.Support.isModern) {
                
                event = data.view.document.createEvent('MouseEvents');

                event.initMouseEvent(
                    data.name,
                    data.bubbles,
                    cancelable,
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
                    data.relatedTarget || null //IE 9 throw and Invalid argument if this one is undefined so just in case
                );

                canceled = !data.target.dispatchEvent(event);
            
            } else {
            
                event = data.view.document.createEventObject();

                event.bubbles = data.bubbles;
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

                // IE8 can cancel mousedown, mouseup, mouseover seriously....
                canceled = cancelable ? canceled : false;

            }
            
            return {
                event: event,
                canceled: canceled
            };
        }
    };

})();
