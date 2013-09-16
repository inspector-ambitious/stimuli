'use strict';

(function() {

    var ns = Stimuli.device;

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

    // Extends Stimuli.Device.Abstract
    Stimuli.core.Object.merge(Mouse.prototype, Stimuli.device.Abstract);

})();