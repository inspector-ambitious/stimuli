'use strict';

(function() {
        
    var Mouse = Domino.device.Mouse = function(options) {

        this.name = 'mouse';

    };
    

    Mouse.prototype.leftClick = function(options, callback) {
        return this.send('leftClick', options, callback);
    };

    
    // Extends Domino.Device.Abstract
    Domino.core.Object.merge(Mouse.prototype, Domino.device.Abstract);
    
})();
