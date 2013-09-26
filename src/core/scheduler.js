'use strict';

/**
 * @class Stimuli.core.Scheduler
 * @mixins Stimuli.core.Observable
 * @private
 * Provides a convenient way to "buffer" any data.
 * @cfg {Number} speed The emission speed.
 * @cfg {Number} delay The emission delay in ms.
 * @constructor
 * Creates a new scheduler
 * @param {Object} config The config object
 */

(function() {

    Stimuli.core.Scheduler = function(options) {
        var self = this;
        options = options || {};
        self.delay = !isNaN(options.delay) ? options.delay : 1;
        self.speed = !isNaN(options.speed) ? options.speed : 1;
        self.scope = options.scope || self;
        self.queue = [];
        self.locked = false;
    };

    var Scheduler = Stimuli.core.Scheduler;

    // Applies Observable mixin
    Stimuli.core.Class.mix(Stimuli.core.Scheduler, Stimuli.core.Observable);

    /**
     * Schedules data
     * @param {Mixed} data The data to schedule.
     * @param {Function} callback The function to call when the data is ready.
     */
    Scheduler.prototype.schedule = function(data, callback, options, position) {
        var self = this,
            frame = {data: data, callback: callback, options: options};

        if (typeof position === 'undefined') {
            self.queue.push(frame);
        } else {
            self.queue.splice(position, 0, frame);
        }
        self.next();

    };


    Scheduler.prototype.calculateTimeout = function(options) {
        var delay, speed;


        delay = !isNaN(options.delay) ? options.delay: this.delay;
        speed = !isNaN(options.speed) ? options.speed: this.speed;


        return delay/speed;
    };

    
    Scheduler.prototype.skip = function() {
        this.locked = false;
        this.next();
    };


    /**
     * @private
     * Tries to immediately publish the data.
     * If it's not possible it returns immediately.
     * Also it wraps the original callback to provide asynchronous callback support,
     * this way no data will be published until the callback will
     */
    Scheduler.prototype.next = function() {
        var self = this;

        if (self.locked || self.queue.length === 0) {
            return;
        }

        self.locked = true;

        var frame = self.queue.shift(),
            options = frame.options || {},
            data = frame.data,
            fn = frame.callback || function() {},
            scope = options.scope || self.scope;

        var callback = function() {
            var args = Array.prototype.slice.call(arguments, 0);

            // asynchronous action callback
            if (fn.length > args.length) {
                // adding a function as last argument to allow the execution
                // of the next device action
                args.push(function() {
                    self.locked = false;
                    self.next();
                });

                fn.apply(scope, args);
                // synchronous action callback
            } else {
                fn.apply(scope, args);
                self.locked = false;
                self.next();
            }

        };

        var timeout = self.calculateTimeout(options);

        if (timeout) {
            setTimeout(function() {
                self.publish('event', data, callback, options);
            }, timeout);
        } else {
            self.publish('event', data, callback, options);
        }


    };

})();