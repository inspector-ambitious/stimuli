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
        return this.context.screenX || this.context.screenLeft;
    };

    /**
     * Returns the y coordinate of window relative to the screen.
     * @return {Number}
     */
    Viewport.prototype.getScreenY = function() {
        return this.context.screenY || this.context.screenTop;
    };

    /**
     * Returns the a visible element at the specified coordinates.
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @return {HTMLElement}
     */
    Viewport.prototype.getVisibleElementAt = function(x, y) {
        var self = this,
            doc = self.context.document;

        if (x < 0 || y < 0) {
            return null;
        }

        var ret = doc.elementFromPoint(x, y);


        // IE8 hack: When nesting iframes ie8 doesn't layout properly 
        // freshly inserted elements, so before calling elementFromPoint
        // we trigger a reflow to force the layout to be recalculated
        // (Note: that was a tricky one it's 4:39AM)
        if (Stimuli.core.Support.isIE8 &&
            ret === null &&
            self.context.parent && self.context.parent.parent) { // encapsulated iframe check
            doc.body.getBoundingClientRect();
            ret = doc.elementFromPoint(x, y);
        }

        return ret;
    };

    /**
     * Returns the viewport window.
     * return {Window}
     */
    Viewport.prototype.getContext = function() {
        return this.context;
    };

    /**
     * Sets the viewport window.
     * return {Window}
     */
    Viewport.prototype.setContext = function(context) {
        this.context = context;
    };


    Viewport.prototype.destroy = function() {
        this.context = null;
    };

    /**
     *
     * @returns {*}
     */

    Viewport.prototype.waitToBeReady = function(callback) {
        var self = this;

        function waitFor() {
            if (!!self.context) {
                callback();
                return;
            }
            setTimeout(waitFor, 25);
        }
        waitFor();
    };

    Viewport.prototype.updateHash = function(hash) {
        this.context.location.hash = hash;
    };

    Viewport.prototype.updateUrl = function(url) {
        this.context.location = url;
        this.context = null;
    };

    /**
     * Returns the first {HTMLElement} matching the css selector.
     * @param {string} selector The css selector (see http://sizzlejs.com/)
     * @param {Boolean=} all If set to True all elements matching the css selector will be returned in an {Array}. 
     * @return {Mixed}
     */

    Viewport.prototype.$ = function(selector, all) {
        /* jshint newcap: false */
        var elements = Sizzle(selector, this.context.document);
        if (all) {
            return elements;
        } else {
            return elements[0];
        }
    };

    
})();