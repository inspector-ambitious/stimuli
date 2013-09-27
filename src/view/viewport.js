'use strict';

/**
 * @class Stimuli.view.Viewport
 * Provides methods to deal with the visible elements of the viewport,
 * the page size and scrolling.
 * @cfg {Window=} view A window object 
 * @constructor
 * @param {Object} config The config object
 */

(function() {

    Stimuli.view.Viewport = function(context) {

        this.context = context || null;

    };

    var Viewport = Stimuli.view.Viewport;

    /**
     * Returns the x coordinate of the window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenX = function() {
        var win = this.context.get();
        return win.screenX || win.screenLeft;
    };

    /**
     * Returns the y coordinate of window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenY = function() {
        var win = this.context.get();
        return win.screenY || win.screenTop;
    };

    /**
     * Returns the a visible element at the specified coordinates.
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @return {HTMLElement}
     */
    Viewport.prototype.getVisibleElementAt = function(x, y) {
        var context = this.context.get(),
            doc = context.document;

        if (x < 0 || y < 0) {
            return null;
        }

        var ret = doc.elementFromPoint(x, y);


        // IE8 hack: When nesting iframes ie8 doesn't layout properly 
        // freshly inserted elements, so before calling elementFromPoint
        // we trigger a reflow to force the layout to be recalculated
        // (Note: that was a tricky one it's 4:39AM)
        // TODO:(yhwh) Try to set the iframe in position relative
        // see http://stackoverflow.com/questions/4444014/blank-iframe-in-ie
        if (Stimuli.core.Support.isIE8 &&
            ret === null &&
            context.parent && context.parent.parent) { // encapsulated iframe check
            doc.body.getBoundingClientRect();
            ret = doc.elementFromPoint(x, y);
        }

        return ret;
    };

    /**
     * Returns the viewport window.
     * return {Window}
     */
    Viewport.prototype.getWindow = function() {
        return this.context.get();
    };

    Viewport.prototype.getDocument = function() {
        return this.context.get().document;
    };


    Viewport.prototype.updateHash = function(hash) {
        this.context.get().location.hash = hash;
    };

    Viewport.prototype.updateUrl = function(url) {
        this.context.get().location = url;
    };


    Viewport.prototype.waitForReady = function(callback) {
        var self = this;

        function waitFor() {
            if (self.context.isLoading()) {
                setTimeout(waitFor, 1);
                return;
            }
            callback();
        }

        setTimeout(waitFor, 1);
    };


    /**
     * Returns the first {HTMLElement} matching the css selector.
     * @param {string} selector The css selector (see http://sizzlejs.com/)
     * @param {Boolean=} all If set to True all elements matching the css selector will be returned in an {Array}. 
     * @return {Mixed}
     */

    Viewport.prototype.$ = function(selector, all) {
        var elements = Sizzle(selector, this.context.get().document);
        if (all) {
            return elements;
        } else {
            return elements[0];
        }
    };

    
})();