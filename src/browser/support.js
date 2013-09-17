'use strict';

/**
 * @class Stimuli.browser.Support
 * @singleton
 * This class detects supported browser features.
 */

Stimuli.browser.Support = {

    /**
     * @property {Boolean}
     * Is it a modern browser ?
     */
    isModern: typeof document.createEvent !== 'undefined'

};