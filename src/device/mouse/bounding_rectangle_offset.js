'use strict';

(function() {

    Domino.device.mouse.BoundingRectangleOffset = function(options, boundingRectangle) {

        var width = boundingRectangle.getWidth(),
            height = boundingRectangle.getHeight();
            
        this.origin = options.origin || 'center';

        options.x = options.x || 0;
        options.y = options.y || 0;

        switch(this.origin) {
            case 'tl':
                this.x = options.x;
                this.y = options.y;
                break;
            case 'bl':
                this.x = options.x;
                this.y = height - options.y;
                break;
            case 'tr':
                this.x = width - options.x;
                this.y = options.y;
                break;
            case 'br':
                this.x = width - options.x;
                this.y = height - options.y;
                break;
            default: // 'center'
                this.x = options.x + width/2;
                this.y = options.y + height/2;
        }

    };

    var BoundingRectangleOffset = Domino.device.mouse.BoundingRectangleOffset;

    BoundingRectangleOffset.prototype.getX = function() {
        return this.x;
    };

    BoundingRectangleOffset.prototype.getY = function() {
        return this.y;
    };

})();