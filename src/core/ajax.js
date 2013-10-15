'use strict';

/**
 * @class Stimuli.core.Ajax
 * @singleton
 * This singleton provides communications with a remote server. Requests are asynchronous, and will return immediately.
 */
(function() {
    var xhr;

    try {
        xhr = new XMLHttpRequest();
    } catch (ex) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    Stimuli.core.Ajax = {

        /**
         * Sends a HTTP GET requests to a remote server.
         * @param {String} url The remote server url.
         * @param {Function} callback The function to call when the request is complete.
         */
        get: function(url, callback) {

            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4) {
                    xhr.onreadystatechange = null;
                    if (callback) {
                        callback(this.responseText, this.status, this.statusText);
                    }
                }
            };

            xhr.open('get', url, true);

            xhr.send();
        },

        /**
         * Sends a HTTP POST requests to a remote server.
         * @param {String} url The remote server url.
         * @param {Object} data The data to post.
         * @param {Function} callback The function to call when the request is complete.
         */
        post: function(url, data, callback) {

            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4) {
                    xhr.onreadystatechange = null;
                    if (callback) {
                        callback(this.responseText, this.status, this.statusText);
                    }
                }
            };

            xhr.open('post', url);
            xhr.setRequestHeader("Content-Type", 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(data));
        }

    };

})();