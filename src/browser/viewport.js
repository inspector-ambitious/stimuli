'use strict';

/**
 * @class Stimuli.browser.Viewport
 * Provides methods to deal with the window and the dom elements positioning.
 * @cfg {Window} view A window object 
 * @constructor
 * Creates a new viewport
 * @param {Object} config The config object
 */

(function() {

    Stimuli.browser.Viewport = function(view) {

        this.view = view || window;

    };

    var Viewport = Stimuli.browser.Viewport;

    /**
     * Iterates through all the document visible pixels.
     * @param {Function} fn The function to call for each visible pixel
     * @param {HTMLElement} el The element
     * @param {Number} x The pixel x coordinate
     * @param {Number} y The pixel y coordinate
     */
    Viewport.prototype.traverse = function(fn) {
        var doc = this.view.document,
            x = 0,
            y = 0,
            el;

        // Scan the entire viewport pixel by pixel
        while(true) {
            el = doc.elementFromPoint(x, y);
            
            if (!el) {
                break;
            }

            while(el) {
                fn(el, x, y);
                y++;
                el = doc.elementFromPoint(x, y);
            }
            x++;
            y = 0;
        }
    };

    /**
     * Returns the x coordinate of the window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenX = function() {
        return this.view.screenX || this.view.screenLeft;
    };

    /**
     * Returns the y coordinate of window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenY = function() {
        return this.view.screenY || this.view.screenTop;
    };

    /**
     * Returns the element from the document at the specified coordinates.
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @return {HTMLElement}
     */
    Viewport.prototype.getElementAt = function(x, y) {
        return this.view.document.elementFromPoint(x, y);
    };

    /**
     * Returns the current viewport window.
     * return {Window}
     */
    Viewport.prototype.getView = function() {
        return this.view;
    };
    
})();