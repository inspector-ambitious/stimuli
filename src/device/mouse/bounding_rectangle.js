'use strict';

(function() {

    var ns = Domino.device.mouse;

    ns.BoundingRectangle = function(viewport, element) {
        var me = this;

        me.left = Number.MAX_VALUE;
        me.right = Number.MIN_VALUE;
        me.top = Number.MAX_VALUE;
        me.bottom = Number.MIN_VALUE;
        me.valid = false;

        viewport.traverse(function(currentElement, x, y) {
            if (currentElement === element) { // element found
                me.valid = true;
                me.left = Math.min(me.left, x);
                me.right = Math.max(me.right, x);
                me.top = Math.min(me.top, y);
                me.bottom = Math.max(me.bottom, y);
            }
        });

        me.right++;

        me.bottom++;

    };

    var BoundingRectangle = ns.BoundingRectangle;

    BoundingRectangle.prototype.isValid = function() {
        return this.valid;
    };

    BoundingRectangle.prototype.getTop = function() {
        return this.top;
    };

    BoundingRectangle.prototype.getLeft = function() {
        return this.left;
    };

    BoundingRectangle.prototype.getWidth = function() {
        return this.right - this.left;
    };

    BoundingRectangle.prototype.getHeight = function() {
        return this.bottom - this.top;
    };

})();