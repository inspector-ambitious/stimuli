'use strict';

/**
 * @private
 * @class Stimuli.device.Generic
 * @mixins Stimuli.utils.Observable
 * A generic device implementation to mixes with other classes.
 */

(function() {

    Stimuli.device.Generic = {

        /**
         * @protected
         * Sends a command.
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