'use strict';

(function() {
    
    var ns = Domino.interaction,
        isBoolean = Domino.core.Type.isBoolean;

    ns.Interaction = {

        getEvents: function() {
            return this.events;
        },

        fail: function(message) {
            this.options.callback(message);
        },

        cancelable: function() {
            return isBoolean(this.options.cancelable) ? this.options.cancelable : true;
        },

        bubbles: function() {
            return isBoolean(this.options.bubbles) ? this.options.bubbles : true;
        },

        view: function() {
            return this.viewport.getView();
        },
        
        altKey: function() {
            return this.options.altKey || false;
        },

        metaKey: function() {
            return this.options.metaKey || false;
        },

        ctrlKey: function() {
            return this.options.ctrlKey || false;
        },

        shiftKey: function() {
            return this.options.shiftKey || false;
        },

        send: function(data) {
            var me = this,
                cb = this.options.callback,
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
        }
     
    };

    Domino.core.Object.merge(ns.Interaction, Domino.core.Observable);

})();
