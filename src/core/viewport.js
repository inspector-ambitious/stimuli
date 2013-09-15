'use strict';

(function() {
    var ns = Domino.core;

    ns.Viewport = function(view) {

        this.view = view || window;

    };

    var Viewport = ns.Viewport;

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

    Viewport.prototype.getScreenX = function() {
        return this.view.screenX || this.view.screenLeft;
    };

    Viewport.prototype.getScreenY = function() {
        return this.view.screenY || this.view.screenTop;
    };

    Viewport.prototype.getElementAt = function(x, y) {
        return this.view.document.elementFromPoint(x, y);
    };

})();