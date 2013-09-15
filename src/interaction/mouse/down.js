'use strict';

(function() {

    var ns = Domino.interaction.mouse;

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

            view: me.view(),

            button: me.getButton(),

            cancelable: true,

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

            screenY: position.getScreenY(),

            relatedTarget: null
           
        });

    };

    Domino.core.Object.merge(ns.down.prototype, ns.Abstract.proto);

})();