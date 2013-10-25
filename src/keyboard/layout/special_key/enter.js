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
            sequence = [
                Obj.merge({
                    type: "keydown",
                    location: 0,
                    keyCode: 13
                }, defaultEventConfig),
                Obj.merge({
                    type: "keypress",
                    location: 0
                }, defaultEventConfig)
            ];

            if (Dom.isEditable(target) && !Dom.isEditableInput(target)) {

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

            sequence.push(Obj.merge({
                type: "keyup",
                location: 0,
                keyCode: 13
            }, defaultEventConfig));

            return sequence;
        }
    };
})();