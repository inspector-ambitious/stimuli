'use strict';

(function() {
    
    Stimuli.browser.Browser = {

        iframes: [],

        idSeed: 0,

        createViewport: function(options, callback) {
            var me = this,
                timeout = options.timeout || 2000,
                startingTime = (new Date()).getTime(),
                iframe = document.createElement('iframe'),
                style = iframe.style,
                view;

            // iframe.width = options.width ? options.width + 'px' : '100%';
            style.width = options.width ? options.width + 'px' : '100%';
            // iframe.height = options.height ? options.height + 'px' : '100%';
            style.height = options.height ? options.height + 'px' : '100%';

            // style.border = 0;
            iframe.frameBorder = 0;
 
            style.margin = 0;
            style.padding = 0;


            document.body.appendChild(iframe);
            var iframeObserver = new Stimuli.event.Observer(iframe);

            function waitForReady() {
                var view = iframe.contentWindow,
                    doc = view.document,
                    time = (new Date()).getTime();
                iframeObserver.unsubscribeAll();
                if ((time - startingTime) > timeout) {
                    document.body.removeChild(iframe);
                    callback(null);
                } else if (doc.body || doc.body.readyState === 'complete') {
                    var viewport = new Stimuli.browser.Viewport(view);

                    viewport.id = me.idSeed;

                    me.idSeed++;
                    me.iframes.push(iframe);
                    
                    callback(null, viewport);
                }
            }

            iframeObserver.subscribe('load', waitForReady);

            iframe.src = options.url;
            
        },

        destroyViewport: function(viewport) {
            if (!isNaN(viewport.id)) {
                var iframe = this.iframes[viewport.id];
                document.body.removeChild(iframe);
                iframe = null;
            }
        }

    };

})();