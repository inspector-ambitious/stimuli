'use strict';

(function() {

    var ns = Domino.device.mouse;

    ns.Mouse = function(options) {

        this.name = 'mouse';

        this.viewport = options.viewport;

    };
    
    var Mouse = ns.Mouse;

    Mouse.prototype.translate = function(options) {

        var boundingRectangle,
            boundingRectangleOffset,
            target;


        boundingRectangle = new ns.BoundingRectangle(this.viewport, options.target);
 
        boundingRectangleOffset = new ns.boundingRectangleOffset(options.offset, boundingRectangle.getWidth(), boundingRectangle.getHeight());

        target = new ns.Target(this.viewport, options.target, boundingRectangle, boundingRectangleOffset);

    };

    Mouse.prototype.leftClick = function(options, callback) {
        return this.send('leftClick', this.translate(options), callback);
    };


    Mouse.prototype.rightClick = function(options, callback) {
        return this.send('rightClick', this.translate(options), callback);
    };


    Mouse.prototype.middleClick = function(options, callback) {
        return this.send('middleClick', this.translate(options), callback);
    };

    // Extends Domino.Device.Abstract
    Domino.core.Object.merge(Mouse.prototype, Domino.device.Abstract);

    // Alias
    Domino.device.Mouse = Domino.device.mouse.Mouse;

})();