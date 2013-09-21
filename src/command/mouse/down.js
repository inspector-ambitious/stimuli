'use strict';

(function() {

    var ns = Stimuli.command.mouse;

    ns.down = ns.Generic.ctor;

    ns.down.prototype.execute = function() {
        var me = this,
            target = me.getTarget(),
            position = me.calculatePosition(target, me.options.offset);

        if (position === null) {
            return;
        }

        me.send({
            
            name: 'mousedown',

            button: me.getButton(),

            bubbles: true,

            cancelable: true,
            
            altKey: me.getAltKey(),

            ctrlKey: me.getCtrlKey(),

            shiftKey: me.getShiftKey(),

            metaKey: me.getMetaKey(),

            detail: 1,

            target: target,

            clientX: position.getClientX(),
            
            clientY: position.getClientY(),

            screenX: position.getScreenX(),

            screenY: position.getScreenY()
           
        }, me.options.callback);

    };

    Stimuli.utils.Object.merge(ns.down.prototype, ns.Generic.proto);

})();