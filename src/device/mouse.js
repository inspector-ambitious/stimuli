'use strict';

(function() {

    var ns = Domino.device;

    ns.Mouse = function(options) {

        this.name = 'mouse';

    };
    
    var Mouse = ns.Mouse;

    Mouse.prototype.click = function(options, callback) {
        return this.send('click', options, callback);
    };

    Mouse.prototype.dblclick = function(options, callback) {
        return this.send('dblclick', options, callback);
    };

    Mouse.prototype.move = function(options, callback) {
        return this.send('move', options, callback);
    };

    Mouse.prototype.drag = function(options, callback) {
        return this.send('drag', options, callback);
    };

    Mouse.prototype.up = function(options, callback) {
        return this.send('up', options, callback);
    };

    Mouse.prototype.down = function(options, callback) {
        return this.send('down', options, callback);
    };

    // Extends Domino.Device.Abstract
    Domino.core.Object.merge(Mouse.prototype, Domino.device.Abstract);

})();