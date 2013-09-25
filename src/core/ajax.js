'use strict';

(function() {

    var xhr;

    try {
        xhr = new XMLHttpRequest();
    } catch (ex) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    Stimuli.core.Ajax = {

        get: function(url, callback) {

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

            xhr.open('get', url, true);
            xhr.send();
        }

    };

})();