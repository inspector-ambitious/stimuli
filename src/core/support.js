'use strict';

/**
 * @class Stimuli.core.Support
 * @singleton
 * This class detects supported browser features.
 */

Stimuli.core.Support = {

    /**
     * @property {Boolean}
     * Is it a modern browser ?
     */
    isModern: typeof document.createEvent !== 'undefined'

};