'use strict';

(function() {
    
    Stimuli.virtual.Browser = function(context, options) {
        var self = this;

        self.context = context;

        self.options = options || {};

        self.iframe = self.options.iframe || new Stimuli.core.Iframe(context, self.options);

        self.history = self.options.history || new Stimuli.core.History(context);

    };

    var Browser = Stimuli.virtual.Browser;

    Stimuli.core.Class.mix(Browser, Stimuli.core.Deferable);

    Browser.prototype.navigateTo = function(url) {
        var self = this;

        return self.then(function(done) {
            self.iframe.load(url, done);
        });

    };

    Browser.prototype.back = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(-1, done);
        });
    };

    Browser.prototype.forward = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(1, done);
        });
    };

    Browser.prototype.reload = function() {
        var self = this;

        return self.then(function(done) {
            self.history.go(0, done);
        });
    };

    Browser.prototype.destroy = function(callback) {
        var self = this;
        return self.defer(function(done) {

            var history = self.history;
            if (history) {
                history.destroy();
            }

            var iframe = self.iframe;
            if (iframe) {
                iframe.destroy(done);
            }
        }, callback);
    };

})();