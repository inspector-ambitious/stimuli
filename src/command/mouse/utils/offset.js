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

})();