'use strict';

(function() {

    var ns = Domino.device.mouse;

    ns.Target = function(viewport, element, boundingRectangle, boundingRectangleOffset) {
        var me = this;

        if (!boundingRectangle.isValid()) {
            new ns.Exception('Unable to locate a visible target in the viewport.');
        }

        
        me.boundingRectangle = boundingRectangle;

        me.boundingRectangleOffset = boundingRectangleOffset;


        me.element = element;

    };

    var Target = ns.Target;

    Target.prototype.isValid = function() {
        return this.visible;
    };

    Target.prototype.getClientX = function() {
        return this.boundingRectangle.getLeft() + this.offset.getX();
    };

    Target.prototype.getClientY = function() {
        return this.boundingRectangle.getTop() + this.offset.getY();
    };

    Target.prototype.getScreenX = function() {
        return this.viewport.getScreenX() + this.getClientX();
    };

    Target.prototype.getScreenY = function() {
        return this.viewport.getScreenY() + this.getClientY();
    };

    Target.prototype.getElement = function() {
        return this.element;
    };
    
})();