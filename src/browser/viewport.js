'use strict';

/**
 * @class Stimuli.browser.Viewport
 * Provides methods to deal with the visible elements of the viewport,
 * the page size and scrolling.
 * @cfg {Window=} view A window object 
 * @constructor
 * @param {Object} config The config object
 */

(function() {

    Stimuli.browser.Viewport = function(view, iframe) {

        this.view = view || window;

    };

    var Viewport = Stimuli.browser.Viewport;

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
     * Returns the a visible element at the specified coordinates.
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @return {HTMLElement}
     */
    Viewport.prototype.getVisibleElementAt = function(x, y) {
        var me = this,
            doc = me.view.document;

        if (x < 0 || y < 0) {
            return null;
        }

        var ret = doc.elementFromPoint(x, y);


        // IE8 hack: When nesting iframes ie8 doesn't layout properly 
        // freshly inserted elements, so before calling elementFromPoint
        // we trigger a reflow to force the layout to be recalculated
        // (Note: that was a tricky one it's 4:39AM)
        if (Stimuli.browser.Support.isIE8 &&
            ret === null &&
            me.view.parent && me.view.parent.parent) { // encapsulated iframe check
            doc.body.getBoundingClientRect();
            ret = doc.elementFromPoint(x, y);
        }

        return ret;
    };

    /**
     * Returns the viewport window.
     * return {Window}
     */
    Viewport.prototype.getView = function() {
        return this.view;
    };

    /**
     * Returns the viewport document.
     * return {Window}
     */
    Viewport.prototype.getDocument = function() {
        return this.view.document;
    };

    /**
     * Returns the first {HTMLElement} matching the css selector.
     * @param {string} selector The css selector (see http://sizzlejs.com/)
     * @param {Boolean=} all If set to True all elements matching the css selector will be returned in an {Array}. 
     * @return {Mixed}
     */

    Viewport.prototype.$ = function(selector, all) {
        /* jshint newcap: false */
        var elements = Sizzle(selector, this.view.document);
        if (all) {
            return elements;
        } else {
            return elements[0];
        }
    };

    
})();