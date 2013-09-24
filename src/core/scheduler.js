'use strict';

/**
 * @class Stimuli.core.Scheduler
 * @mixins Stimuli.core.Observable
 * @private
 * Provides a convenient way to "buffer" the emission of data.
 * @cfg {Number} speed The emission speed
 * @cfg {Number} delay The emission delay in ms
 * @constructor
 * Creates a new scheduler
 * @param {Object} config The config object
 */

(function() {

    Stimuli.core.Scheduler = function(options) {
        this.delay = options.delay || 1;
        this.speed = options.speed || 1;

        this.queue = [];
        this.locked = false;
    };

    var Scheduler = Stimuli.core.Scheduler;

    // Applies Observable mixin
    Stimuli.core.Class.mix(Stimuli.core.Scheduler, Stimuli.core.Observable);

    /**
     * Receives data to emit.
     * @param {Object} data The data to emit.
     */
    Scheduler.prototype.schedule = function(data, callback, options) {
        var self = this,
            frame = {data: data, callback: callback, options: options};

        if (options && options.now) {
            self.queue.splice(0, 0, frame);
        } else {
            self.queue.push(frame);
        }

        self.emit();

    };

    Scheduler.prototype.calculateTimeout = function(options) {
        var delay = this.delay,
            speed = this.speed,
            timeout;

        if (options) {
            delay = !isNaN(options.delay) ? options.delay: delay;
            speed = !isNaN(options.speed) ? options.speed: speed;
        }

        return delay/speed;
    };

    Scheduler.prototype.skip = function() {
        this.locked = false;
        this.emit();
    };

    /**
     * @private
     * Schedules emission of received data   
     */
    Scheduler.prototype.emit = function() {
        var self = this;
        if (self.locked || self.queue.length === 0) {
            return;
        }

        self.locked = true;

        var frame = self.queue.shift(),
            options = frame.options,
            data = frame.data,
            fn = frame.callback || function() {};

        var callback = function() {
            var args = Array.prototype.slice.call(arguments, 0);

            // asynchronous action callback
            if (fn.length > args.length) {
                // adding a function as last argument to allow the execution
                // of the next device action
                args.push(function() {
                    self.locked = false;
                    self.emit();
                });

                fn.apply(self, args);
                // synchronous action callback
            } else {
                fn.apply(self, args);
                self.locked = false;
                self.emit();
            }

        };

        var timeout = self.calculateTimeout(options);

        if (timeout) {
            setTimeout(function() {
                self.publish('data', data, callback, options);
            }, timeout);
        } else {
            self.publish('data', data, callback, options);
        }


    };

})();