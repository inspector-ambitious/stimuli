'use strict';

(function() {

    Stimuli.keyboard.Helper = {

        parseArguments: function(args) {
            var self = this;



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
                input = null;
            });

            return editableInputs;

        }()),

        isDesignMode: function(target) {
            return target.ownerDocument.designMode.toLowerCase() === 'on';
        },

        isEditableInput: function(target) {
            var tagName = target.tagName.toLowerCase(),
                type = target.getAttribute('type');

            if (tagName === 'input') {
                return Stimuli.core.Array.contains(this.editableInputs, type);
            }

            return false;
        },

        isTextArea: function(target) {
            return target.tagName.toLowerCase() === 'textarea';
        },

        isContentEditable: function(target) {
            var parentNode = target;
            while(parentNode) {
                if (parentNode.contentEditable === 'true') {
                    return true;
                }
                parentNode = parentNode.parentNode;
            }
            return false;
        },

        isEditable: function(target) {
            var self = this;
            return self.isEditableInput(target) || self.isTextArea(target) ||
                self.isDesignMode(target) || self.isContentEditable(target);
        },

        updateEditableHtml: function(target, key) {
            var doc = target.ownerDocument,
                range;
            if (typeof doc.createRange === 'function') {
                var div, frag;
                range = doc.createRange();
                range.selectNodeContents(target);
                range.collapse(false);
                div = doc.createElement("div");
                div.innerHTML = key;
                frag = doc.createDocumentFragment();
                frag.appendChild(div.firstChild);
                range.insertNode(frag);
                div = null;
                frag = null;
            } else if (doc.selection && doc.selection.createRange) {
                range = doc.selection.createRange();
                range.collapse(true);
                range.pasteHTML(key);
                range.collapse(false);
            }
        },

        updateEditableValue: function(target, key) {
            var startPos;
            if (typeof target.selectionStart === 'number') {
                var endPos, value, before, after;

                startPos = target.selectionStart;
                endPos = target.selectionEnd;
                value = target.value;
                before = value.substr(0, startPos);
                after = value.substr(endPos);

                target.value = before + key + after;
                target.selectionStart = startPos + 1;
                target.selectionEnd = startPos + 1;

            } else {
                var range = target.ownerDocument.selection.createRange();

                startPos = range.text.length;

                if (range.parentElement() === target) {
                    range.text = key;
                    range.collapse(false);
                    range.move('character', startPos +1);
                }
            }
        }

    };

    Stimuli.core.Object.merge(Stimuli.keyboard.Helper, Stimuli.core.Chainable);
})();
