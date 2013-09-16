'use strict';

(function() {

    var ns = Stimuli.interaction.mouse;

    ns.down = ns.Abstract.ctor;

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

            bubbles: me.getBubbles(),

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

    Stimuli.core.Object.merge(ns.down.prototype, ns.Abstract.proto);

})();