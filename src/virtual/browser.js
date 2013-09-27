'use strict';

(function() {
    
    Stimuli.virtual.Browser = function(options) {
        var self = this;
        self.options = options || {};

        self.backHistory = [];
        self.forwardHistory = [];

    };

    var Browser = Stimuli.virtual.Browser;

    // Extends Stimuli.Device.Abstract
    Stimuli.core.Class.mix(Browser, Stimuli.core.Deferable);


    Browser.prototype.navigateTo = function(url) {
        var self = this;

        if (!self.iframe) {
            self.iframe = new Stimuli.core.Iframe(self.options);

            self.iframe.subscribe('loaded', function(context) {
                self.viewport.setContext(context);
                if (!self.isBack && !self.isForward) {
                    self.backHistory.push(context.location + '');
                } else {
                    self.isBack = false;
                    self.isForward = false;
                    self.forwardHistory = [];
                }
            });

            self.iframe.subscribe('error', function(status, statusText) {
                throw new Error('Stimuli.browser: Unable to navigate to url. (' + status + ') ' + statusText);
            });

        }

        return self.then(function(done) {
            self.viewport.setContext(null);
            self.iframe.load(url);
            self.viewport.waitToBeReady(done);
        });

    };

    Browser.prototype.back = function() {
        var self = this;

        return self.then(function(done) {
            var context = self.viewport.getContext();
            self.viewport.setContext(null);
            if (self.backHistory.length > 0) {
                self.forwardHistory.push(self.backHistory.pop());
                self.isBack = true;
                context.history.back();
            } else {
                throw new Error('Stimuli.browser: Can\'t go back there is no history.');
            }
            self.viewport.waitToBeReady(done);
        });
    };

    Browser.prototype.forward = function() {
        var self = this;

        return self.then(function(done) {
            var context = self.viewport.getContext();
            self.viewport.setContext(null);
            if (self.forwardHistory.length > 0) {
                self.backHistory.push(self.forwardHistory.pop());
                self.isForward = true;
                context.history.forward();
            } else {
                throw new Error('Stimuli.browser: Can\'t go forward there is no history.');
            }
            self.viewport.waitToBeReady(done);
        });
    };

    Browser.prototype.reload = function() {
        var self = this;

        return self.then(function(done) {
            var context = self.viewport.getContext();
            self.viewport.setContext(null);
            context.location = context.location + '';
            self.viewport.waitToBeReady(done);
        });
    };

    Browser.prototype.destroy = function(callback) {
        var self = this;
        return self.defer(function(next) {
            var iframe = self.iframe;
            if (iframe) {
                iframe.destroy();
            }
            next();
        }, callback);
    };

})();