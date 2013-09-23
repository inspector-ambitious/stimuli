'use strict';

(function() {
    
    Stimuli.virtual.Browser = function(viewport) {
        this.viewport = viewport;
        this.iframe = new Stimuli.core.Iframe();
    };

    var Browser = Stimuli.virtual.Browser;


    Browser.prototype.navigateTo = function(options, callback) {
        var me = this;

        function navigateTo(next) {
            me.iframe.navigateTo(options, function(win) {
                me.viewport.setWindow(win);
                next(win);
            });
        }

        send(me, navigateTo, callback);
    };

    Browser.prototype.close = function() {
        var me = this;

        function destroy() {
            me.viewport.setWindow(window);
            me.iframe.destroy();
        }

        send(me, destroy);

    };

    // Extends Stimuli.Device.Abstract
    Stimuli.core.Class.mix(Browser, Stimuli.core.Observable);

    function send(me, fn, callback) {

        me.publish('command', {

            fn: fn,

            callback: callback

        });

        return me;
    }

})();