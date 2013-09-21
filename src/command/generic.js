'use strict';

(function() {
    
    Stimuli.command.Generic = {

        getEvents: function() {
            return this.events;
        },

        fail: function(message) {
            this.options.callback(message);
        },


        send: function(data, cb) {
            var me = this,
                callback = function(event, canceled) {
                
                me.events.push({
                    src: event,
                    canceled: canceled
                });
                
                if (cb) {
                    cb(null, event, canceled);
                }
            };
            
            this.publish('event', data, callback);

            return this;
        }
     
    };

    Stimuli.utils.Object.merge(Stimuli.command.Generic, Stimuli.utils.Observable);

})();
