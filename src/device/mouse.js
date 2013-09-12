'use strict';

(function() {
        
    var Mouse = Domino.device.Mouse = function(options) {

        this.name = 'mouse';

    };
    

    Mouse.prototype.leftClick = function(options, callback) {
        return this.send('leftClick', options, callback);
    };

    Mouse.prototype.rightClick = function(options, callback) {
        return this.send('rightClick', options, callback);
    };
    
    Mouse.prototype.middleClick = function(options, callback) {
        return this.send('middleClick', options, callback);
    };

    // Extends Domino.Device.Abstract
    Domino.core.Object.merge(Mouse.prototype, Domino.device.Abstract);
    
})();
