'use strict';

(function() {

    Stimuli.keyboard.Helper = {

        getTarget: function() {
            return this.viewport.getWindow().document.activeElement || null;
        }

    };

    Stimuli.core.Object.merge(Stimuli.keyboard.Helper, Stimuli.core.Chainable);
})();
