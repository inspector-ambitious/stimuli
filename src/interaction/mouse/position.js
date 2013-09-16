'use strict';

(function() {

    var ns = Stimuli.interaction.mouse;

    ns.Position = function(viewport, element, boundingRectangle, boundingRectangleOffset) {
        
        var me = this;

        me.boundingRectangle = boundingRectangle;

        me.boundingRectangleOffset = boundingRectangleOffset;

        me.viewport = viewport;

        me.element = element;

    };

    var Position = ns.Position;

    Position.prototype.isValid = function() {
        var me = this;
        return me.viewport.getElementAt(me.getClientX(), me.getClientY()) === me.element;
    };

    Position.prototype.getClientX = function() {
        return this.boundingRectangle.getLeft() + this.offset.getX();
    };

    Position.prototype.getClientY = function() {
        return this.boundingRectangle.getTop() + this.offset.getY();
    };

    Position.prototype.getScreenX = function() {
        return this.viewport.getScreenX() + this.getClientX();
    };

    Position.prototype.getScreenY = function() {
        return this.viewport.getScreenY() + this.getClientY();
    };
    
})();