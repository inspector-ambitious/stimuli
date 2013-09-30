'use strict';

/**
 * @class Stimuli.shared.Viewport
 * A viewport abstraction layer to be used by virtual devices.
 * @cfg {Window=} view A window object 
 * @constructor
 * @param {Stimuli.shared.Context} context The current browser context this viewport depends on.
 */

(function() {

    Stimuli.shared.Viewport = function(context) {

        this.context = context || null;

    };

    var Viewport = Stimuli.shared.Viewport;

    /**
     * Returns the x coordinate of the window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenX = function() {
        var win = this.context.getWindow();
        return win.screenX || win.screenLeft;
    };

    /**
     * Returns the y coordinate of window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenY = function() {
        var win = this.context.getWindow();
        return win.screenY || win.screenTop;
    };

    /**
     * Returns a visible element at the specified coordinates.
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @return {HTMLElement}
     */
    Viewport.prototype.getVisibleElementAt = function(x, y) {
        var context = this.context.getWindow(),
            doc = context.document;

        if (x < 0 || y < 0) {
            return null;
        }

        var ret = doc.elementFromPoint(x, y);


        // IE8 hack: Inside an iframe ie8 doesn't repaint properly inside an iframe, so before calling elementFromPoint
        // we trigger a reflow to force the layout to be recalculated
        // (Note: that was a tricky one it's 4:39AM)
        // see http://stackoverflow.com/questions/4444014/blank-iframe-in-ie
        if (Stimuli.core.Support.isIE8 &&
            ret === null &&
            context.parent !== context) { // iframe check
            doc.body.getBoundingClientRect();
            ret = doc.elementFromPoint(x, y);
        }

        return ret;
    };

    /**
     * Returns the current window.
     * @return {Window}
     */
    Viewport.prototype.getWindow = function() {
        return this.context.getWindow();
    };

    /**
     * Returns the current document.
     * @return {Object}
     */
    Viewport.prototype.getDocument = function() {
        return this.context.getWindow().document;
    };

    /**
     * Updates window hash.
     * @param {String} hash The new hash.
     */
    Viewport.prototype.updateHash = function(hash) {
        this.context.getWindow().location.hash = hash;
    };

    /**
     * Updates the current window url.
     * @param {String} url The new url.
     */
    Viewport.prototype.updateUrl = function(url) {
        this.context.getWindow().location = url;
    };

    /**
     * Waits for the viewport to be ready, it allows to block while a stimulus caused
     * a navigation to another page.
     * @param {Function} callback The function to call when the viewport is ready.
     */
    Viewport.prototype.waitForReady = function(callback) {
        this.context.waitForReady(callback);
    };


    /**
     * Returns the first {HTMLElement} matching the css selector.
     * @param {string} selector The css selector (see http://sizzlejs.com/)
     * @param {Boolean=} all If set to True all elements matching the css selector will be returned in an {Array}. 
     * @return {Mixed}
     */
    Viewport.prototype.$ = function(selector, all) {
        var elements = Sizzle(selector, this.context.getWindow().document);
        if (all) {
            return elements;
        } else {
            return elements[0];
        }
    };

    
})();