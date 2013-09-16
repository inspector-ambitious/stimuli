'use strict';

(function() {

    var ns = Stimuli.device;

    ns.Abstract = {

        send: function(type, data, callback) {

            var me = this;

            callback = callback || function() {};

            me.publish('data', {

                device: me.name,

                type: type,

                data: data,

                callback: callback

            });

            return this;
        }

    };

    Stimuli.core.Object.merge(ns.Abstract, Stimuli.core.Observable);

})();