'use strict';

(function() {
    
    Stimuli.core.Iframe = function(options) {
        options = options || {};
        var iframe = document.createElement('iframe'),
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

        this.iframeEl = iframe;
    };

    var Iframe = Stimuli.core.Iframe;

    Iframe.prototype.navigateTo = function(options, callback) {
        
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }

        var me = this,
            timeout = options.timeout || 2000,
            startingTime = (new Date()).getTime(),
            iframe = me.iframeEl,
            iframeObserver = new Stimuli.view.event.Observer(iframe);

        function waitForReady() {
            var win = iframe.contentWindow,
                doc = win.document,
                time = (new Date()).getTime();

            iframeObserver.unsubscribeAll();
            if ((time - startingTime) > timeout) {
                document.body.removeChild(iframe);
                callback(null);
            } else if (doc.body || doc.body.readyState === 'complete') {
                callback(win);
            }

        }

        iframeObserver.subscribe('load', waitForReady);

        iframe.src = options.url;
    };

    Iframe.prototype.destroy = function() {
        var me = this;
        if (me.iframeEl) {
            document.body.removeChild(me.iframeEl);
            me.iframeEl = null;
        }
    };

})();