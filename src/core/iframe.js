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

        iframe.id = 'stimuli-iframe';
        iframe.name = 'stimuli-iframe';

        iframe.frameBorder = 0;

        style.margin = 0;
        style.padding = 0;

        document.body.appendChild(iframe);

        self.iframeEl = iframe;

        self.iframeObserver = new Stimuli.view.event.Observer(iframe);

        self.iframeObserver.subscribe('load', self.onLoad, self);

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

//        var self = this;
//
//
//        self.ajax.request({
//
//            url: options.url,
//
//            callback: function(response) {
//                var win = self.iframeEl.contentWindow,
//                    doc = self.iframeEl.contentWindow;
//
//                doc.open().write(response);
//
//                doc.close()
//
//            },
//
//            ontimeout: function() {
//                callback(null);
//            }
//        });

//        var self = this,
//            timeout = options.timeout || 2000,
//            startingTime = (new Date()).getTime(),
//            iframe = self.iframeEl;
//
//
//        function waitForReady() {
//            var win = iframe.contentWindow;
//
//
//        }



//        iframeObserver.subscribe('unload', function() {
//            console.log('unload');
//        });


    };

    Iframe.prototype.onLoad = function() {
        var self = this,
            win = self.iframeEl.contentWindow;


        self.winObserver = new Stimuli.view.event.Observer(win);

        self.winObserver.subscribe('unload', function() {
            self.winObserver.unsubscribeAll();
            self.publish('beforerefresh');
        });


        self.publish('refresh', win);
    };

    Iframe.prototype.destroy = function() {
        var self = this;
        if (self.iframeEl) {
            self.iframeObserver.unsubscribeAll();
            self.winObserver.unsubscribeAll();
            document.body.removeChild(self.iframeEl);
            self.iframeEl = null;
        }
    };

})();