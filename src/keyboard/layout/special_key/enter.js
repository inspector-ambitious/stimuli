'use strict';
(function() {
    var Dom = Stimuli.core.Dom,
        Support = Stimuli.core.Support,
        Obj = Stimuli.core.Object;

    Stimuli.keyboard.specialKey.Enter = {

        getSequence: function(target) {
            var defaultEventConfig = {
                bubbles: true,
                cancelable: true,
                target: target
            },
            keyCode = 13,
            location = 0,
            sequence = [
                Obj.merge({
                    type: "keydown",
                    location: location,
                    keyCode: keyCode
                }, defaultEventConfig),
                Obj.merge({
                    type: "keypress",
                    location: location
                }, defaultEventConfig)
            ];

            if (Dom.isEditable(target)) {

                if (Dom.isInput(target)) {
                    var form = Dom.getAncestorForm(target);

                    if (form && Dom.hasSubmit(form)) {
                        sequence.push(function() {
                            form.submit();
                        });
                    }

                } else {

                    if (Support.isWebkit) {
                        sequence.push(Obj.merge({type: 'textInput', key: '\n'}, defaultEventConfig));
                    } else {
                        if (Dom.isTextArea(target)) {
                            sequence.push(function() {
                                Dom.updateEditableValue(target, '\n');
                            });
                        } else {
                            sequence.push(function() {
                                Dom.updateEditableHtml(target, '\n');
                            });
                        }

                        if (!Support.isIE8 && !Support.isIE9 && !Support.isIE10 && Dom.isTextArea(target)) {
                            sequence.push(Obj.merge({type: 'input'}, defaultEventConfig));
                        }
                    }
                }
            }

            sequence.push(Obj.merge({
                type: "keyup",
                location: location,
                keyCode: keyCode
            }, defaultEventConfig));

            return sequence;
        }
    };
})();