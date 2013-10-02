'use strict';

/**
 * @class Stimuli.browser.Iframe
 * @mixins Stimuli.core.Chainable
 * This class wraps an iframe element for the {Stimuli.virtual.Browser}.
 * @constructor
 * @param {Stimuli.shared.Context} The browser context.
 * @param {Object=} options
 * @param {Number/String} options.width The iframe width in px (Number) or in % (String)
 * @param {Number/String} options.height The iframe height in px (Number) or in % (String)
 */
(function() {
    
    Stimuli.browser.Iframe = function(context, options) {
        var self = this;
        self.options = options || {};
        self.context = context;
    };

    var Iframe = Stimuli.browser.Iframe;

    Stimuli.core.Class.mix(Iframe, Stimuli.core.Chainable);

    /**
     * Initializes the iframe element.
     */
    Iframe.prototype.initIframe = function() {
        var self = this,
            wrap = self.getRootDocument().createElement('div'),
            iframe = self.getRootDocument().createElement('iframe'),
            options = self.options,
            wstyle = wrap.style,
            istyle = iframe.style;

        wstyle.position = 'absolute';
        wstyle.top = 0;
        wstyle.left = 0;
        wstyle.border = 0;
        wstyle.margin = 0;
        wstyle.padding = 0;
        wstyle.width =  options.width ? options.width + 'px' : '100%';
        wstyle.height =  options.height ? options.height + 'px' : '100%';

        istyle.position = 'relative';
        istyle.width = '100%';
        istyle.height = '100%';
        istyle.border = 0;
        istyle.margin = 0;
        istyle.padding = 0;
        iframe.frameBorder = 0;

        // ie8 hack: iframe src must be set see http://aspnetresources.com/blog/always_set_iframe_source
        if (Stimuli.core.Support.isIE8) {
            iframe.src = 'about:blank';
        }

        self.iframeEl = iframe;
        self.iframeObserver = new Stimuli.event.Observer(self.iframeEl);
        self.iframeObserver.subscribe('load', self.onIframeLoad, self);

        self.wrapEl = self.getRootDocument().body.appendChild(wrap);

        wrap.appendChild(iframe);

    };

    Iframe.prototype.onIframeLoad = function() {
        var self = this,
            win = self.iframeEl.contentWindow;

            // by default ie and firefox fires load on about:blank so we skip this window to keep consistenty with other
            // browsers
            if ((win.location + '') !== 'about:blank') {
                // IE hack: onload event is not extremely reliable so we need to do an additional check here to ensure
                // the document is truly ready.
                var checkDocReadyState = function() {
                    var doc, readyTest;
                    try {
                        doc = win.document;
                        readyTest = doc && doc.body && doc.readyState === 'complete';
                    } catch(e) {}
                    if (readyTest) {
                        // IE10 hack: forcing iframe reflow, because the iframe could be loaded but not yet painted !
                        if (Stimuli.core.Support.isIE10) {
                            self.iframeEl.getBoundingClientRect();
                        }
                        var winObserver = new Stimuli.event.Observer(win);

                        winObserver.once('beforeunload', function() {
                            winObserver.unsubscribeAll();
                            self.context.setLoading();
                            winObserver = null;
                        });

                        winObserver.once('unload', function() {
                            winObserver.unsubscribeAll();
                            self.context.setLoading();
                            winObserver = null;
                        });

                        self.context.setNew(win);

                    } else {
                        setTimeout(checkDocReadyState, 20);
                    }
                };

                // Let's clear the call stack to prevent errors to be thrown in the top most window context.
                setTimeout(checkDocReadyState, 1);
            }
    };
    /**
     * Returns the root window.
     */
    Iframe.prototype.getRootWindow = function() {
        var win = window;

        while(win.parent && win.parent !== win) {
            win = win.parent;
        }

        return win;
    };

    /**
     * Returns the root document to avoid iframe nesting as much as possible, which can cause repaint issues with IE.
     */
    Iframe.prototype.getRootDocument = function() {
        return this.getRootWindow().document;
    };

    /**
     * @chainable
     * Loads the page at the specified url
     * @param {String} url The page url.
     * @param {Function} callback The function to call when the page is fully loaded.
     */
    Iframe.prototype.load = function(url, callback) {
        var self = this;

        if (!self.iframeEl) {
            self.initIframe();
        }
        return self.defer(function(done) {
            Stimuli.core.Ajax.get(url, function(response, status, statusText) {

                if (status !== 200) {
                    throw new Error('Stimuli.browser.Iframe: Failed to load url (' + status + ' ' + statusText +')');
                }

                self.context.once('new', done);

                self.iframeEl.src = url;

            });

        }, callback);

    };

    /**
     * @chainable
     * Destroys the iframe from the dom and remove all the attached listeners.
     * @param {Function} callback The callback function.
     */
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

            if (self.wrapEl) {
                self.wrapEl.parentNode.removeChild(self.wrapEl);
                self.wrapEl = null;
            }

            self.context.destroy();
            done();
        }, callback);
    };

})();