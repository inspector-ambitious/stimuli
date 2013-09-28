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

            if (Stimuli.core.Support.isIE8)  {
                xhr.onreadystatechange = function() {
                    if(xhr.readyState === 4){
                        xhr.onreadystatechange = null;
                        callback(this.responseText, this.status, this.statusText);
                    }
                };
            } else {
                xhr.onload = function() {
                    xhr.onload = null;
                    callback(this.responseText, this.status, this.statusText);
                };
            }


            xhr.open('get', url, true);
            xhr.send();
        }

    };

})();