'use strict';

(function() {

    Stimuli.core.Ajax = function() {
        var xhr;

        try {
            xhr = new XMLHttpRequest();
        } catch (ex) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        this.xhr = xhr;
    };

    var Ajax = Stimuli.core.Ajax;

    Ajax.prototype.request = function(options) {
        var xhr = this.xhr,
            url = options.url,
            method = options.method || 'get',
            callback = options.callback,
            sync = options.sync || false,
            timeout = options.timeout || 5000,
            data = options.data;

        if (!sync) {
            xhr.onload = function() {
                xhr.onload = null;
                xhr.onreadystatechange = null;
                callback(this.responseText);
            };

            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4){
                    xhr.onload = null;
                    xhr.onreadystatechange = null;
                    callback(this.responseText);
                }
            };
        }


        xhr.open(method, url, !sync);
        xhr.timeout = timeout;
        xhr.ontimeout = options.ontimeout;
        xhr.send();

        if (sync) {
            callback(xhr.responseText);
        }
    };

})();