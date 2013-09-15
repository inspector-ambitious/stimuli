'use strict';

(function() {

    var ns = Domino.interaction.mouse;

    ns.down = ns.Abstract.ctor;

    ns.down.prototype.execute = function() {

        var me = this,
            options = me.options,
            element,
            boundingRectangle,
            offset,
            boundingRectangleOffset,
            target;

        if (options.target === 'function') {
            element = options.target();
        } else {
            element = options.target || me.viewport.getElementAt(options.x, options.y);
        }

        if (!element) {
            me.fail('Unable to find target.');
            return;
        }

        boundingRectangle = me.getBoundingRectangle(element);

        if (!boundingRectangle.isValid()) {
            me.fail('The target exists but is not visible in the viewport.');
            return;
        }

        offset = options.offset || boundingRectangle.getFirstElementOffset();
        
        boundingRectangleOffset = me.getBoundingRectangleOffset(offset, boundingRectangle);

        target =  me.getTarget(element, boundingRectangle, boundingRectangleOffset);

        me.send({
            
            name: 'mousedown',

            view: me.view(),

            button: me.getButton(),

            cancelable: me.cancelable(),

            bubbles: me.bubbles(),

            altKey: me.altKey(),

            ctrlKey: me.ctrlKey(),

            shiftKey: me.shiftKey(),

            metaKey: me.metaKey(),

            detail: 1,

            target: target.getElement(),

            clientX: target.getClientX(),
            
            clientY: target.getClientY(),

            screenX: target.getScreenX(),

            screenY: target.getScreenY(),

            relatedTarget: null
           
        });

    };

    Domino.core.Object.merge(ns.down.prototype, ns.Abstract.proto);

})();