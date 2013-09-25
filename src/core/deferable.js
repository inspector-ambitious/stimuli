'use strict';

(function() {


    Stimuli.core.Deferable = {

        initScheduler: function(options) {
            var self = this;
            options = options || {};
            options.delay = !isNaN(options.delay) ? options.delay : 0;
            options.scope = options.scope || self;

            self.scheduler = new Stimuli.core.Scheduler(options);

            var error = null;

            self.scheduler.subscribe('event', function(fn, callback, options) {
                fn.call(self, callback);
            });
        },

        defer: function(fn, callback, options) {
            var self = this;
            fn = fn || function(done) {done();};

            if (!self.scheduler) {
                self.initScheduler();
            }

            self.scheduler.schedule(fn, callback, options);
            return self;
        },

        then: function(callback) {
            var self = this;
            self.defer(null, callback, {delay: 0});
            return self;
        },

        sleep: function(delay, callback) {
            var self = this;
            self.defer(null, callback, {delay: delay});
            return self;
        }

    };

//    Stimuli.core.Object.merge(Stimuli.core.Deferable, Stimuli.core.Observable);


})();

// Dependencies
Stimuli.core.Class.mix(Stimuli, Stimuli.core.Deferable);
