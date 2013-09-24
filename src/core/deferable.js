'use strict';

(function() {


    Stimuli.core.Deferable = {

        initScheduler: function(options) {
            var self = this;
            options = options || {};
            options.delay = options.delay || 0;
            options.speed = options.speed || 1;

            self.scheduler = new Stimuli.core.Scheduler({
                delay: 0
            });

            var error = null;

            self.scheduler.subscribe('data', function(fn, callback, options) {

                if (error !== null) {
                    if (options && options.failure) {
                        callback(error);
                        error = null;
                    }
                    self.scheduler.skip();
                    return;
                }

                try {
                    fn(callback);
                } catch(e) {
                    error = e;
                    self.scheduler.skip();
                }

            });
        },

        attachScheduler: function(scheduler) {
            this.scheduler = scheduler;
        },

        defer: function(fn, callback, options) {
            var self = this;
            self.scheduler.schedule(fn, callback, options);
            return self;
        },

        then: function(fn) {
            var self = this;
            self.defer(function(cb) {cb();}, fn, {delay: 0});
            return self;
        },

        sleep: function(delay) {
            var self = this;
            self.defer(function(cb) {cb();}, null, {delay: delay});
            return self;
        },

        onfailure: function(fn) {
            var self = this;
            self.defer(function() {}, fn, {delay: 0, failure: true});
            return self;
        }

    };

//    Stimuli.core.Object.merge(Stimuli.core.Deferable, Stimuli.core.Observable);


})();

// Dependencies
Stimuli.core.Class.mix(Stimuli, Stimuli.core.Deferable);
