'use strict';

(function() {

    var ns = Stimuli.command.mouse.utils;

    ns.BoundingRectangleOffset = function(options, xLimit, yLimit) {
            
        this.origin = options.origin || 'center';

        options.x = options.x || 0;
        options.y = options.y || 0;

        switch(this.origin) {
            case 'center':
                this.x = options.x + xLimit/2;
                this.y = options.y + yLimit/2;
                break;
            case 'bl':
                this.x = options.x;
                this.y = yLimit - options.y;
                break;
            case 'tr':
                this.x = xLimit - options.x;
                this.y = options.y;
                break;
            case 'br':
                this.x = xLimit - options.x;
                this.y = yLimit - options.y;
                break;
            default: // 'tl'
                this.x = options.x;
                this.y = options.y;
        }

    };

    var BoundingRectangleOffset = ns.BoundingRectangleOffset;

    BoundingRectangleOffset.prototype.getX = function() {
        return this.x;
    };

    BoundingRectangleOffset.prototype.getY = function() {
        return this.y;
    };

})();