'use strict';

/**
 * @class Stimuli.core.Support
 * @singleton
 * This class detects supported browser features.
 */

(function() {
    var userAgent = navigator.userAgent,
        isWebkit = /AppleWebKit/.test(userAgent),
        isChrome = /Chrome\//.test(userAgent),
        isPhantomJS = /PhantomJS/.test(userAgent),
        isSafari = isWebkit && !isChrome && isPhantomJS,
        isGecko = /Gecko\//.test(userAgent),
        isLinux = /Linux/.test(userAgent),
        isWindows = /Windows\sNT/.test(userAgent),
        isMacOSX = /Intel\sMac\sOS\sX/.test(userAgent),
        isIOS = /(iPad|iPhone|iPod)/.test(userAgent),
        isIE = false,
        IEVersion = 0,
        jscriptMap = {
            "5.8": 8,
            "9": 9,
            "10": 10
        },
        jscriptVersion = 'none',
        isIE11;

    /*@cc_on
     jscriptVersion = @_jscript_version;
     @*/
    IEVersion = jscriptMap[jscriptVersion];
    if (IEVersion) {
        isIE = true;
    }
    isIE11 = /Trident\/7\.0/.test(userAgent);

Stimuli.core.Support = {

    /**
     * @property {Boolean}
     * Is true if document supports addEventListener method
     */
    documentAddEventListener: typeof document.addEventListener === 'function',

    /**
     * @property {Boolean}
     * Is true if window supports MouseEvent class (Firefox, Chrome)
     */
    windowMouseEvent: typeof MouseEvent === 'function',


    /**
     * @property {Boolean}
     * Is true if document supports createEvent method (IE9, IE10, IE11, Safari, PhantomJS)
     */
    documentCreateEvent: typeof document.createEvent === 'function',

    
    /**
     * @property {Boolean}
     * Is true if document supports createEventObject method. (IE8, IE9, IE10)
     */
    documentCreateEventObject: typeof document.createEventObject === 'function',

    /**
     * @property {Boolean}
     * Is true if browser is Internet Explorer.
     */
    isIE: isIE,

    /**
     * @property {Boolean}
     * Is true if browser is Internet Explorer 8
     */
    isIE8: isIE && IEVersion === 8,

    /**
     * @property {Boolean}
     * Is true if browser is Internet Explorer 9
     */
    isIE9: isIE && IEVersion === 9,

    /**
     * @property {Boolean}
     * Is true if browser is Internet Explorer 10
     */
    isIE10: isIE && IEVersion === 10,

    /**
     * @property {Boolean}
     * Is true if browser is Internet Explorer 11
     */
    isIE11: isIE11,

    /**
     * @property {Boolean}
     * Is true if browser is IOS
     */
    isIOS: isIOS,

    /**
     * @property {Boolean}
     * Is true if browser rendering engine is Webkit
     */
    isWebkit: isWebkit,

    /**
     * @property {Boolean}
     * Is true if the browser is PhantomJS.
     */
    isPhantomJS: isPhantomJS,

    /**
     * @property {Boolean}
     * Is true if the browser is Chrome.
     */
    isChrome: isChrome,

    /**
     * @property {Boolean}
     * Is true if the browser is Safari.
     */
    isSafari: isSafari,

    /**
     * @property {Boolean}
     * Is true if the browser rendering engine is Gecko
     */
    isGecko: isGecko,

    /**
     * @property {Boolean}
     * Is true is the browser is running on MacOSX.
     */
    isMacOSX: isMacOSX,

    /**
     * @property {Boolean}
     * Is true is the browser is running on Windows.
     */
    isWindows: isWindows,

    /**
     * @property {Boolean}
     * Is true is the browser is running on Linux.
     */
    isLinux: isLinux,

    /**
     * Returns the current OS name, "windows", "macosx", "linux", "ios", "android"
     * @return {String}
     */
    getOS: function() {
        if (isLinux) {
            return 'linux';
        }
        if (isMacOSX) {
            return 'macosx';
        }
        if (isWindows) {
            return 'windows';
        }
        if (isIOS) {
            return 'ios';
        }
    }
};

})();