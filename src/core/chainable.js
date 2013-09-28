'use strict';

/**
 * @class Stimuli.core.Chainable
 * @singleton
 * This mixin provides asynchronous function queueing (a bit like promises)
 */
(function() {

    Stimuli.core.Chainable = {

        /**
         * Initializes the functions queue.
         * @param {Object=} options
         * @param {Number} [options.delay=0] The default delay before executing a function.
         * @param {Mixed} [options.scope=this] The scope used for calling asynchronous functions.
         */
        initScheduler: function(options) {
            var self = this;
            options = options || {};
            options.delay = !isNaN(options.delay) ? options.delay : 0;
            options.scope = options.scope || self;

            self.scheduler = new Stimuli.core.Scheduler(options);

            var error = null;

            self.scheduler.subscribe('event', function(fn, callback) {
                fn.call(options.scope, callback);
            });

        },

        /**
         * @chainable
         * Adds an asynchronous function at the top of the queue.
         * @param {Function} fn The asynchronous function.
         * @param {Function} callback The asynchronous function callback.
         * @param {Object} options
         * @param {Number} options.delay The default delay before executing a function.
         */
        sneak: function(fn, callback, options) {
            var self = this;
            fn = fn || function(done) {done();};

            if (!self.scheduler) {
                self.initScheduler();
            }

            self.scheduler.schedule(fn, callback, options, 0);
            return self;
        },

        /**
         * @chainable
         * Adds an asynchronous function and it's callback at the bottom of the queue.
         * @param {Function} fn The asynchronous function.
         * @param {Function} callback The asynchronous function callback.
         * @param {Object} options
         * @param {Number} options.delay The default delay before executing a function.
         */
        defer: function(fn, callback, options) {
            var self = this;
            fn = fn || function(done) {done();};

            if (!self.scheduler) {
                self.initScheduler();
            }

            self.scheduler.schedule(fn, callback, options);
            return self;
        },

        /**
         * @chainable
         * Adds a function at the bottom of the queue.
         * @param {Function} callback The function.
         */

        then: function(callback) {
            return this.defer(null, callback);
        },

        /**
         * @chainable
         * Sleeps for the specified amount of time.
         * @param {Number} delay The sleeping delay in ms.
         */
        sleep: function(delay) {
            return this.defer(null, null, {delay: delay});
        },

        /**
         * Synchronizes another instance with this one.
         * @param {Object} instance.
         */
        synchronize: function(instance) {
            var self = this;
            if (!self.scheduler) {
                self.initScheduler();
            }
            instance.scheduler = this.scheduler;
        }

    };

})();

// Dependencies
Stimuli.core.Class.mix(Stimuli, Stimuli.core.Chainable);
