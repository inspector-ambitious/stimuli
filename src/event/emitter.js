'use strict';

(function() {
    var ns = Stimuli.event,
        synthetizer = ns.synthetizer;

    ns.Emitter = {

        isMouseEvent: function(name) {
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
            }[name] || false;
        },

        emit: function(data, callback) {
            var result;

            if (this.isMouseEvent(data.name)) {
                result = synthetizer.Mouse.inject(data);
            }

            callback(result.event, result.canceled);
        }

    };


})();