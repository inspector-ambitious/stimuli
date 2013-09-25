'use strict';

(function() {
    
    Stimuli.core.Iframe = function(options) {

        options = options || {};
        var self = this,
            iframe = document.createElement('iframe'),
            style = iframe.style;

        style.width = options.width ? options.width + 'px' : '100%';

        style.height = options.height ? options.height + 'px' : '100%';

        style.position = 'absolute';
        style.top = 0;
        style.left = 0;
        style.border = 0;

        iframe.frameBorder = 0;

        style.margin = 0;
        style.padding = 0;

        document.body.appendChild(iframe);

        self.iframeEl = iframe;

        self.iframeObserver = new Stimuli.view.event.Observer(iframe);

        self.iframeObserver.subscribe('load', function() {
            self.publish('loaded',self.iframeEl.contentWindow);
        }, self);

    };

    var Iframe = Stimuli.core.Iframe;

    Stimuli.core.Class.mix(Iframe, Stimuli.core.Observable);

    Iframe.prototype.navigateTo = function(options) {
        
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }

        this.iframeEl.src = options.url;

    };

    Iframe.prototype.destroy = function() {
        var self = this;

        if (self.iframeEl) {
            self.iframeObserver.unsubscribeAll();
            document.body.removeChild(self.iframeEl);
            self.iframeEl = null;
        }
    };

})();