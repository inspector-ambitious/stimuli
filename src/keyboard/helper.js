'use strict';

(function() {

    Stimuli.keyboard.Helper = {

        parseOptions: function() {
            var self = this,
                args = self.args;
            self.options = {};
            if (typeof args[0] === 'string') {
                self.options.keys = args[0];
            }
        },

        getTarget: function() {
            return this.viewport.getWindow().document.activeElement || null;
        },

        fixInputValue: function(target, key) {
            if (typeof target.selectionStart === 'number') {
                var startPos = target.selectionStart,
                endPos = target.selectionEnd,
                value = target.value,
                before = value.substr(0, startPos),
                after = value.substr(endPos);

                target.value = before + key + after;
                target.selectionStart = startPos + 1;
                target.selectionEnd = startPos + 1;

            } else {
                var range = document.selection.createRange();

                if (key !== '' && range.parentElement() === target) {
                    range.text = key;
                }
            }
        }

    };

    Stimuli.core.Object.merge(Stimuli.keyboard.Helper, Stimuli.core.Chainable);
})();
