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

        notTypables: ['\n', '\t', '\b', '\r', '\f'],

        isTypableCharacter: function(key) {

            if (typeof key !== 'string' ||
                Stimuli.core.Array.contains(this.notTypables, key)) {
                return false;
            }

            return String.fromCharCode(key.charCodeAt(0)).length === 1;
        },

        editableInputs: (function() {

            var editableInputs = [  // this types will always be editable
                    'email',
                    'number',
                    'password',
                    'search',
                    'tel',
                    'text',
                    'url'
                ],
                maybeEditableInputs = [  // this types could be editable
                'color',
                'date',
                'datetime',
                'datetime-localinput',
                'month',
                'time',
                'week'
            ],
            textValue = 'foobar';

            // the editability depends on the browser implementation, if an input type is not implemented on a specified
            // browser the input becomes editable. So to check if a field is editable the trick is to try to set the
            // input's value, then if the value is updated it means that the browser didn't do any validation, which
            // means that the input type is probably not implemented
            Stimuli.core.Array.forEach(maybeEditableInputs, function(type) {
                var input = document.createElement('input');

                input.setAttribute('type', type);

                try {

                    input.value = textValue;

                    if (input.value === textValue) {
                        editableInputs.push(type);
                    }

                } catch(e) {}

            });

            return editableInputs;

        }()),

        isEditable: function(target) {
            var self = this,
                tagName = target.tagName.toLowerCase(),
                type = target.getAttribute('type');

            // editable input
            if (tagName === 'input' &&
                Stimuli.core.Array.contains(self.editableInputs, type)) {
                return true;
            } else if (tagName === 'textarea') {
                return true;
            } else if (self.viewport.getDocument().designMode === 'on') {   // design mode
                return true;
            } else {    // contentEditable
                var parentNode = target;
                while(parentNode) {
                    if (parentNode.contentEditable === 'true') {
                        return true;
                    }
                    parentNode = parentNode.parentNode;
                }
            }

            return false;
        },

        hasValue: function(target) {
            return typeof target.value !== 'undefined';
        },

        fixTextualValue: function(target, key) {
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
                var range = this.viewport.getDocument().selection.createRange(),
                startPos = range.text.length;

                if (range.parentElement() === target) {
                    range.text = key;
                    range.collapse(true);
                    range.move('character', startPos +1);
                    range.select();
                }
            }
        }

    };

    Stimuli.core.Object.merge(Stimuli.keyboard.Helper, Stimuli.core.Chainable);
})();
