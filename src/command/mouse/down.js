'use strict';

(function() {


    Stimuli.command.mouse.Down = Stimuli.utils.Class.inherit(Stimuli.command.Generic);

    var Down = Stimuli.command.mouse.Down;

    Stimuli.utils.Class.mix(Down, Stimuli.command.mouse.Helper);

    Down.prototype.execute = function() {
        var me = this,
            callback = me.options.callback,
            target, position;

        target = me.getTarget();
        
        if (target === null) {
            callback('Stimuli.command.mouse.Down: ' + me.error.invalidTarget);
            return;
        }

        position = me.calculateViewportCoordinates(target, me.options.offset);

        if (position === null) {
            callback('Stimuli.command.mouse.Down: ' + me.error.invalidPosition);
            return;
        }

        me.send({
            
            type: 'mousedown',

            button: me.getButton(),

            bubbles: true,

            cancelable: true,
            
            altKey: me.options.alt,

            ctrlKey: me.options.ctrl,

            shiftKey: me.options.shift,

            metaKey: me.options.meta,

            detail: 1,

            target: target,

            clientX: position.clientX,
            
            clientY: position.clientY,

            screenX: position.screenX,

            screenY: position.screenY
           
        }, callback);

    };

})();