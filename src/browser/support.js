'use strict';

/**
 * @class Stimuli.browser.Support
 * @singleton
 * This class detects supported browser features.
 */

Stimuli.browser.Support = {

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
    isIE8: typeof document.addEventListener === 'undefined'
};