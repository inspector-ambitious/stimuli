'use strict';
(function() {

    Stimuli.core.Dom = {

        getAncestorForm: function(element) {
            var tagName, action, form;

            while(element !== element.ownerDocument.body) {
                tagName = element.tagName.toLowerCase();
                action = element.getAttribute('action');
                if (tagName === 'form' && action) {
                    form = element;
                    break;
                }
                element = element.parentNode;
            }

            return form;
        },

        hasSubmit: function(form) {
            var inputs = form.getElementsByTagName('input'),
                length = inputs.length,
                i = 0;

            for (; i < length; i++) {
                if (inputs[i].getAttribute('type') === 'submit') {
                    return true;
                }
            }
            return false;
        },

        isInput: function(element) {
            return element.tagName.toLowerCase() === 'input';
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

        updateEditableHtml:

        Stimuli.core.Support.isGecko ? function(target, key) {

            var doc = target.ownerDocument,
                range = doc.createRange();

            var childNodes = target.childNodes,
                i = childNodes.length - 1,
                node,
                startBeforeNode;

            for (; i >= 0; i--) {
                node = childNodes[i];
                if (this.isTextNode(node)) {
                    if (node.textContent === '\n') {
                        startBeforeNode = node;
                    }
                } else if (node.tagName.toLowerCase() === 'br') {
                    startBeforeNode = node;
                    break;
                }
            }

            if (startBeforeNode) {
                range.setStartBefore(startBeforeNode);
            } else  {
                range.selectNodeContents(target);
                range.collapse(false);
            }

            if (key === '\n') {
                if (!/<br>/.test(target.innerHTML)) {
                    range.insertNode(doc.createElement('br'));
                }

                range.insertNode(doc.createElement('br'));
            } else {
                var div, frag;
                div = doc.createElement("div");
                div.innerHTML = key;
                frag = doc.createDocumentFragment();
                frag.appendChild(div.firstChild);
                range.insertNode(frag);
                div = null;
                frag = null;
            }
            range.collapse(false);

        } :

        Stimuli.core.Support.isWebkit ? function(target, key) {

            var doc = target.ownerDocument,
                range = doc.createRange();

            range.selectNodeContents(target);
            range.collapse(false);

            if (key === '\n') {
                return;
            } else {
                var div, frag;
                div = doc.createElement("div");
                div.innerHTML = key;
                frag = doc.createDocumentFragment();
                frag.appendChild(div.firstChild);
                range.insertNode(frag);
                div = null;
                frag = null;
            }
            range.collapse(false);

        } :

        function(target, key) {      // all IE > 8
            var doc = target.ownerDocument,
                isIE8 = Stimuli.core.Support.isIE8,
                range = isIE8 ? doc.selection.createRange() : doc.createRange(),
                childNodes = target.childNodes,
                i = childNodes.length - 1,
                startAtNode = target,
                startBeforeNode,
                node;

            for (; i >= 0; i--) {
                node = childNodes[i];
                if (this.isTextNode(node)) {
                    if (node.textContent === '\n') {
                        startBeforeNode = node;
                    }
                } else if (key !== '\n' && node.tagName.toLowerCase() === 'p') {
                    startAtNode = node;
                    startBeforeNode = null;
                    if (node.innerHTML === '&nbsp;') {
                        node.innerHTML = '';
                    }
                    break;
                }
            }

            if (startBeforeNode) {
                if (isIE8) {
                    range.moveToElementText(startBeforeNode);
                    range.collapse(true);
                } else {
                    range.setStartBefore(startBeforeNode);
                }
            } else  {
                if (isIE8) {
                    range.moveToElementText(startAtNode);
                    range.collapse(false);
                } else {
                    range.selectNodeContents(startAtNode);
                    range.collapse(false);
                }
            }

            if (key === '\n') {

                var html = target.innerHTML,
                    p;

                if (!/<p|P>/.test(target.innerHTML)) {
                    p = doc.createElement('p');

                    p.innerHTML = html.replace('\n', '');
                    target.innerHTML = '';
                    target.appendChild(p);

                    if (isIE8) {
                        range.moveToElementText(target);
                        range.collapse(false);
                    } else {
                        range.selectNodeContents(target);
                        range.collapse(false);
                    }
                }
                p = doc.createElement('p');
                p.innerHTML = '&nbsp;';

                target.appendChild(p);
                p = null;

                if (/\n/.test(html) && !/\n/.test(target.innerHTML)) {
                    target.innerHTML += '\n';
                }

            } else {
                if (isIE8) {
                    range.collapse(true);
                    range.pasteHTML(key);
                    range.collapse(false);
                } else {
                    var div, frag;
                    div = doc.createElement("div");
                    div.innerHTML = key;
                    frag = doc.createDocumentFragment();
                    frag.appendChild(div.firstChild);
                    range.insertNode(frag);
                    div = null;
                    frag = null;
                }
            }

        },

        updateEditableValue: function(target, key) {
            var startPos;
            if (Stimuli.core.Support.isIE8 || Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10) {

                var range = target.ownerDocument.selection.createRange();

                startPos = range.text.length;

                if (range.parentElement() === target) {
                    range.text = key;
                    range.collapse(false);
                    range.move('character', startPos + 1);
                }

            } else if (typeof target.selectionStart === 'number') {
                var endPos, value, before, after;

                startPos = target.selectionStart;
                endPos = target.selectionEnd;
                value = target.value;
                before = value.substr(0, startPos);
                after = value.substr(endPos);

                target.value = before + key + after;
                target.selectionStart = startPos + 1;
                target.selectionEnd = startPos + 1;

            }
        },

        isTextNode: function(node) {
            return node.nodeType === 3;
        }

    };

})();