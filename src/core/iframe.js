'use strict';

(function() {
    
    Stimuli.core.Iframe = function(context, options) {
        var self = this;


        self.options = options || {};

        self.context = context;


    };

    var Iframe = Stimuli.core.Iframe;

    Stimuli.core.Class.mix(Iframe, Stimuli.core.Deferable);

    Iframe.prototype.initIframe = function() {
        var self = this,
            iframe = document.createElement('iframe'),
            options = self.options,
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



        self.iframeEl = iframe;

        // ie8 hack: iframe src must be set see http://aspnetresources.com/blog/always_set_iframe_source
        if (Stimuli.core.Support.isIE8) {
            iframe.src = 'about:blank';
        }

        self.iframeObserver = new Stimuli.view.event.Observer(iframe);

        document.body.appendChild(iframe);


        // IE hack: allow to wait for the iframe to load
        self.iframeObserver.subscribe('readystatechange', function() {
            if (iframe.readyState === 'loading') {
                self.context.loading = true;
            }
        });

        self.iframeObserver.subscribe('load', function() {
            var win = self.iframeEl.contentWindow;
            // by default ie and firefox fires load on about:blank so we skip this window to keep consistenty with other browsers
            if ((win.location + '') !== 'about:blank') {
                var doc = win.document;

                // IE hack: onload event is not extremely reliable so we need to do an additional check here
                // to ensure the document is truly ready.
                var checkDocReadyState = function() {
                    if (doc && doc.body && doc.readyState === 'complete') {
                        // IE10 hack: forcing iframe reflow, because the iframe could be loaded but not yet painted !
                        if (Stimuli.core.Support.isIE10) {
                            self.iframeEl.getBoundingClientRect();
                        }
                        self.context.set(win);
                    } else {
                        setTimeout(checkDocReadyState, 20);
                    }
                };

                checkDocReadyState();
            }
        });

    };



    Iframe.prototype.load = function(url, callback) {
        var self = this;

        if (!self.iframeEl) {
            self.initIframe();
        }
        return self.defer(function(done) {
            Stimuli.core.Ajax.get(url, function(response, status, statusText) {

                if (status !== 200) {
                    throw new Error('Stimuli.core.Iframe: Failed to load url (' + status + ' ' + statusText +')');
                }

                self.context.once('update', done);

                self.iframeEl.src = url;

            });

        }, callback);

    };

    Iframe.prototype.destroy = function(callback) {
        var self = this;

        return self.defer(function(done) {
            if (self.iframeObserver) {
                self.iframeObserver.unsubscribeAll();
            }

            if (self.iframeEl) {
                self.iframeEl.parentNode.removeChild(self.iframeEl);
                self.iframeEl = null;
            }

            self.context.set(null);
            done();
        }, callback);
    };

})();