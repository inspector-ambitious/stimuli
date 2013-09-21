'use strict';

(function() {
    
    Stimuli.command.Generic = function(options, viewport) {
        this.options = {};
        this.viewport = viewport;
        Stimuli.utils.Object.merge(this, options);
        this.events = [];
    };

    var Generic = Stimuli.command.Generic;

    Generic.prototype.send =  function(data, callback) {

        var me = this,
            callbackWrap;

        callbackWrap = function(event, canceled) {
            
            me.events.push({
                src: event,
                canceled: canceled
            });
            
            if (callback) {
                callback(null, me.events, canceled);
            }
        };
        
        me.publish('event', data, callbackWrap);

        return me;
    };
 
 
    Stimuli.utils.Class.mix(Generic, Stimuli.utils.Observable);

})();