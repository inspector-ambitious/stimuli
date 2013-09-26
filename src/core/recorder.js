'use strict';

(function() {

    Stimuli.core.Recorder = function() {
        var self = this;
        self.tracks = {};
        self.recordingTracks = {};
        self.initialized = false;
    };

    var Recorder = Stimuli.core.Recorder;

    Stimuli.core.Class.mix(Recorder, Stimuli.core.Deferable);

    Recorder.prototype.init = function() {
        var self = this;

        self.scheduler.subscribe('event', function(fn, callback, options) {
            if (!options.recorder) {
                var tracks = this.recordingTracks,
                    trackName;

                for (trackName in tracks) {
                    if (tracks.hasOwnProperty(trackName) && tracks[trackName]) {
                        tracks[trackName].push({
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

    Recorder.prototype.start = function(trackName) {
        var self = this;
        if (!self.initialized) {
            self.init();
        }
        return self.defer(null, function() {
            self.recordingTracks[trackName] = [];
        }, {recorder: true});
    };


    Recorder.prototype.stop = function(trackName) {
        var self = this;
        return self.defer(null, function() {
            self.tracks[trackName] = self.recordingTracks[trackName];
            delete self.recordingTracks[trackName];
        }, {recorder: true});
    };


    Recorder.prototype.replay = function(trackName, times) {
        var self = this;

        return self.defer(null, function() {

            var tracks = self.tracks[trackName],
                length = tracks.length,
                i,
                track;

            times = times || 1;

            while(times--) {
                for (i = length - 1; i >= 0; i--) {
                    track = tracks[i];
                    self.sneak(track.fn, track.callback, track.options);
                }
            }
        }, {recorder: true});
    };

})();