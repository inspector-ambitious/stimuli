'use strict';

(function() {
    
    var ns = Stimuli.interaction,
        isBoolean = Stimuli.core.Type.isBoolean;

    ns.Interaction = {

        getEvents: function() {
            return this.events;
        },

        fail: function(message) {
            this.options.callback(message);
        },

        getTarget: function() {
            
            var options = this.options,
                target = null;

            if (options.target === 'function') {
                target = options.target();
            } else {
                target = options.target || this.viewport.getElementAt(options.x, options.y);
            }

            return target;
        },

        getCancelable: function() {
            return isBoolean(this.options.cancelable) ? this.options.cancelable : true;
        },

        getBubbles: function() {
            return isBoolean(this.options.bubbles) ? this.options.bubbles : true;
        },
        
        getAltKey: function() {
            return this.options.altKey || false;
        },

        getMetaKey: function() {
            return this.options.metaKey || false;
        },

        getCtrlKey: function() {
            return this.options.ctrlKey || false;
        },

        getShiftKey: function() {
            return this.options.shiftKey || false;
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
            
            data.view = this.viewport.getView();

            this.publish('event', data, callback);
        }
     
    };

    Stimuli.core.Object.merge(ns.Interaction, Stimuli.core.Observable);

})();
