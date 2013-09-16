'use strict';

(function() {

    var ns = Stimuli.interaction.mouse;

    ns.BoundingRectangle = function(viewport, element) {
        var me = this;
        me.element = element;

        me.left = Number.MAX_VALUE;
        me.right = Number.MIN_VALUE;
        me.top = Number.MAX_VALUE;
        me.bottom = Number.MIN_VALUE;
        me.valid = false;
        
        viewport.traverse(function(currentElement, x, y) {
            if (currentElement === element) { // element found
                me.valid = true;
                if (!me.targetEdge) {
                    me.targetEdge = {
                        x: x,
                        y: y
                    };
                }
                me.left = Math.min(me.left, x);
                me.right = Math.max(me.right, x);
                me.top = Math.min(me.top, y);
                me.bottom = Math.max(me.bottom, y);
            }
        });
    };

    var BoundingRectangle = ns.BoundingRectangle;

    BoundingRectangle.prototype.isValid = function() {
        return this.valid;
    };

    BoundingRectangle.prototype.getTargetEdge = function() {
        var me = this;
        return {
            x: me.targetEdge.x - me.left,
            y: me.targetEdge.y - me.top
        };
    };

    BoundingRectangle.prototype.getElement = function() {
        return this.element;
    };

    BoundingRectangle.prototype.getTop = function() {
        return this.top;
    };

    BoundingRectangle.prototype.getLeft = function() {
        return this.left;
    };

    BoundingRectangle.prototype.getBottom = function() {
        return this.bottom;
    };

    BoundingRectangle.prototype.getRight = function() {
        return this.right;
    };


})();