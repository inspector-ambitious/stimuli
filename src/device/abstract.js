'use strict';

(function() {

    var ns = Domino.device;

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

    Domino.core.Object.merge(ns.Abstract, Domino.core.Observable);

})();