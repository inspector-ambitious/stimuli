'use strict';

/**
 * @private
 * @class Stimuli.command.mouse.utils.Offset
 * Parses the mouse command offset option.
 * @constructor
 * @param {Object=} options The offset options
 * @param {String} [option.origin='center'] The possible values are 'center', 'bl', 'tr', 'br', 'tl'
 * @param {Number} [option.x=0] The X coordinate relative to the origin
 * @param {Number} [options.y=0] The Y coordinate relative to the origin
 */
(function() {

    Stimuli.command.mouse.utils.Offset = function(options, xLimit, yLimit) {
            
        var origin = options.origin || 'tl',
            x = options.x || 0,
            y = options.y || 0;

        if (typeof x === 'string') {
            x = Math.round(xLimit * (parseInt(x, 10)/100));

        }
        if (typeof y === 'string') {
            y = Math.round(yLimit * (parseInt(y, 10)/100));
            
        }

        switch(origin) {
            case 'bl':
                this.x = x;
                this.y = yLimit + y;
                break;
            case 'tr':
                this.x = xLimit + x;
                this.y = y;
                break;
            case 'br':
                this.x = xLimit + x;
                this.y = yLimit + y;
                break;
            default: // 'tl'
                this.x = x;
                this.y = y;
        }

    };

})();