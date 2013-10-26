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
        isMacOSX = /Mac\sOS\sX/.test(userAgent),
        isIOS = /(iPad|iPhone|iPod)/.test(userAgent),
        isAndroid = /Android/.test(userAgent),
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
     * Is true if browser is Android
     */
    isAndroid: isAndroid,

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
     * Returns the default keyboard layout.
     * @return {String}
     */
    getDefaultKeyboardLayout: function() {
        if (isAndroid || isIOS) {
            return Stimuli.keyboard.layout.Virtual;
        }
        if (isLinux) {
            return Stimuli.keyboard.layout.linux.US;
        }
        if (isMacOSX) {
            return Stimuli.keyboard.layout.macosx.US;
        }
        if (isWindows) {
            return Stimuli.keyboard.layout.windows.US;
        }
    }
};

})();