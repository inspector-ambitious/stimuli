'use strict';

(function() {
    
    Stimuli.virtual.Browser = function(options) {
        var self = this;
        self.viewport = options.viewport;

        self.iframe = new Stimuli.core.Iframe();

        self.iframe.subscribe('refresh', function(win){
            self.win = win;
            self.viewport.setWindow(self.win);
        });

        self.iframe.subscribe('beforerefresh', function() {
            self.win = null;
            self.viewport.setWindow(null);
        });
    };

    var Browser = Stimuli.virtual.Browser;

    // Extends Stimuli.Device.Abstract
    Stimuli.core.Class.mix(Browser, Stimuli.core.Deferable);

    Browser.prototype.navigateTo = function(options, callback) {
        var self = this;
        self.viewport.setWindow(null);
        self.defer(function(cb) {
            self.iframe.subscribe('refresh', function(win) {
                cb(win);
            });
            self.iframe.navigateTo(options);
        }, callback);

        return self;
    };

    Browser.prototype.close = function() {
        var self = this;

        return self.defer(function() {
            self.viewport.setWindow(window);
            self.iframe.destroy();
        });

    };

})();