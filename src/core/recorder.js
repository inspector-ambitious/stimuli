'use strict';

/**
 * @class Stimuli.core.Recorder
 * @mixins Stimuli.core.Chainable
 * This class provides a pretty convenient way to record and replay stimuli flows.
 * @constructor
 */
(function() {

    Stimuli.core.Recorder = function() {
        var self = this;
        self.savedSessions = {};
        self.openedSessions = {};
        self.initialized = false;
    };

    var Recorder = Stimuli.core.Recorder;

    Stimuli.core.Class.mix(Recorder, Stimuli.core.Chainable);

    /**
     * Initializes scheduler observation.
     */
    Recorder.prototype.init = function() {
        var self = this;

        self.scheduler.subscribe('event', function(fn, callback, options) {
            if (!options.recorder) {
                var sessions = this.openedSessions,
                    name;

                for (name in sessions) {
                    if (sessions.hasOwnProperty(name) && sessions[name]) {
                        sessions[name].push({
                            fn: fn,
                            callback: callback,
                            options: options
                        });
                    }
                }
            }

        }, self, true);

        self.initialized = true;
    };

    /**
     * @chainable
     * Starts recording stimuli.
     * @param {String} name The name referencing the session to record.
     */
    Recorder.prototype.start = function(name) {
        var self = this;
        if (!self.initialized) {
            self.init();
        }
        return self.defer(null, function() {
            self.openedSessions[name] = [];
        }, {recorder: true});
    };

    /**
     * @chainable
     * Stops recording stimuli.
     * @param {String} name The name referencing the currently recording session.
     */
    Recorder.prototype.stop = function(name) {
        var self = this;
        return self.defer(null, function() {
            self.savedSessions[name] = self.openedSessions[name];
            delete self.openedSessions[name];
        }, {recorder: true});
    };

    /**
     * @chainable
     * Replays a previously recorded stimuli sequence.
     * @param {String} name The name referencing the recorded session.
     * @param {Number=} [times=1] The number of type to replay the recorded sessions.
     */
    Recorder.prototype.replay = function(name, times) {
        var self = this;

        return self.defer(null, function() {
            var sessions = self.savedSessions[name],
                length = sessions.length,
                i,
                session;

            times = times || 1;

            while(times--) {
                for (i = length - 1; i >= 0; i--) {
                    session = sessions[i];
                    self.sneak(session.fn, session.callback, session.options);
                }
            }
        }, {recorder: true});
    };

})();