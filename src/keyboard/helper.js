'use strict';

(function() {

    Stimuli.keyboard.Helper = {

        getTarget: function() {
            return this.viewport.getWindow().document.activeElement || null;
        },

        notTypables: ['\n', '\t', '\b', '\r', '\f'],

        isTypableCharacter: function(key) {

            if (typeof key !== 'string' ||
                Stimuli.core.Array.contains(this.notTypables, key)) {
                return false;
            }

            return String.fromCharCode(key.charCodeAt(0)).length === 1;
        }

    };

    Stimuli.core.Object.merge(Stimuli.keyboard.Helper, Stimuli.core.Chainable);
})();
