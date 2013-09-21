'use strict';

/**
 * @private
 * @class Stimuli.command.mouse.utils.Position
 * Provides methods to calculate the mouse event position relative to the screen and the viewport.
 * @constructor
 * @param {Stimuli.browser.Viewport} viewport The relative viewport
 * @param {HTMLElement} element The mouse event target
 * @param {Object=} offsetOptions The offset options (see {Stimulit.command.mouse.utils.Offset})
 */
(function() {

    Stimuli.command.mouse.utils.Position = function(viewport, element, offsetOptions) {
        
        var me = this;

        me.boundingRectangle = element.getBoundingClientRect();

        me.offset = new Stimuli.command.mouse.utils.Offset(offsetOptions, me.boundingRectangle.left, me.boundingRectangle.top);

        me.viewport = viewport;

        me.element = element;

    };

    var Position = Stimuli.command.mouse.utils.Position;

    /**
     * Determines if the element position is not ouf of bounds.
     * @return {Boolean} True if not out of bounds
     */
    Position.prototype.isValid = function() {
        var me = this;
        return me.viewport.getElementAt(me.getClientX(), me.getClientY()) === me.element;
    };

    /**
     * Returns the X coordinate relative to the viewport.
     * @return {Number}
     */
    Position.prototype.getClientX = function() {
        return this.boundingRectangle.left + this.offset.x;
    };


    /**
     * Returns the Y coordinate relative to the viewport.
     * @return {Number}
     */
    Position.prototype.getClientY = function() {
        return this.boundingRectangle.top + this.offset.y;
    };

    /**
     * Returns the X coordinate relative to the screen.
     * @return {Number}
     */
    Position.prototype.getScreenX = function() {
        return this.viewport.getScreenX() + this.getClientX();
    };

    /**
     * Returns the Y coordinate relative to the screen.
     * @return {Number}
     */
    Position.prototype.getScreenY = function() {
        return this.viewport.getScreenY() + this.getClientY();
    };
    
})();