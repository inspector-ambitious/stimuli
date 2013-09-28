'use strict';

/**
 * @class Stimuli.core.Support
 * @singleton
 * This class detects supported browser features.
 */

(function() {

    var isIE = false,
        IEVersion = 0,
        jscriptMap = {
            "5.8": 8,
            "9": 9,
            "10": 10
        },
        jscriptVersion = 'none';

    /*@cc_on
     jscriptVersion = @_jscript_version;
     @*/
    IEVersion = jscriptMap[jscriptVersion];
   if (IEVersion) {
       isIE = true;

   }
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
     * Is true if browser is ie8
     */
    isIE8: isIE && IEVersion === 8,

    /**
     * @property {Boolean}
     * Is true if browser is ie9
     */
    isIE9: isIE && IEVersion === 9,

    /**
     * @property {Boolean}
     * Is true if browser is ie10
     */
    isIE10: isIE && IEVersion === 10

};

})();