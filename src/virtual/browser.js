'use strict';

(function() {
    
    Stimuli.virtual.Browser = function() {};

    var Browser = Stimuli.virtual.Browser;

    // Extends Stimuli.Device.Abstract
    Stimuli.core.Class.mix(Browser, Stimuli.core.Deferable);


    Browser.prototype.navigateTo = function(options) {
        var self = this;

        if (!self.iframe) {
            self.iframe = new Stimuli.core.Iframe();
            self.iframe.subscribe('loaded', function(context) {
                self.viewport.setContext(context);
            });
        }

        return self.then(function(done) {
            self.iframe.navigateTo(options);

            self.viewport.waitToBeReady(done);
        });

    };

    Browser.prototype.destroy = function() {
        var iframe = this.iframe;
        if (iframe) {
            iframe.destroy();
        }
    };

})();