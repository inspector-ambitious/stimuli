'use strict';

/**
 * @class Stimuli.device.Generic
 * This abstract class provides a standardized way for a device to emit a command.
 * @mixins Stimuli.utils.Observable
 * @private
 */

(function() {

    Stimuli.device.Generic = {

        /**
         * @protected
         * @param {String} type The emitted command name
         * @param {Object} options The emitted command options
         * @param {Function} callback The callback function
         */
        send: function(command, options, callback) {

            var me = this;

            callback = callback || function() {};

            me.publish('command', {

                device: me.name,

                command: command,

                options: options,

                callback: callback

            });

        }

    };

    Stimuli.utils.Object.merge(Stimuli.device.Generic, Stimuli.utils.Observable);

})();