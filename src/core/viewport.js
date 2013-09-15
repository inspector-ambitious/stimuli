Domino.core.Viewport = function(view) {

    this.view = view || window;

};

Domino.core.Viewport.prototype.traverse = function(fn) {
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

Domino.core.Viewport.prototype.getScreenX = function() {
    return window.screenX || window.screenLeft;
};

Domino.core.Viewport.prototype.getScreenY = function() {
    return window.screenY || window.screenTop;
};