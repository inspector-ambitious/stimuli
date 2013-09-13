'use strict';

(function() {

    Domino.device.Abstract = {

        send: function(action, options, callback) {

            var me = this;

            callback = callback || function() {};

            if (typeof options === "undefined") {
                throw new Error(me.name + '.' + action + ' needs options as first argument.');
            }

            if (typeof callback === "undefined") {
                throw new Error(me.name + '.' + action + ' needs callback as second argument.');
            }

            me.publish('emit', {

                device: me.name,

                action: action,

                options: options,

                callback: callback

            });

            return this;
        }

    };

    Domino.core.Object.merge(Domino.device.Abstract, Domino.core.Observable);

})();