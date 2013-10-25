'use strict';

(function() {

    Stimuli.keyboard.Type = function() {
        var self = this;
        Stimuli.shared.Command.apply(this, arguments);
        self.layout = arguments[1];
        self.options = {};
        self.options.key = arguments[2][0];
    };

    var Type = Stimuli.keyboard.Type;

    Stimuli.core.Class.mix(Type, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Type, Stimuli.keyboard.Helper);

    Type.prototype.execute = function(done) {

        var self = this,
            target = self.getTarget(),
            key = self.options.key;

        var sequence = self.layout.getSequence(key, target);

        Stimuli.core.Array.forEach(sequence, function(frame) {

            if (typeof frame === 'function') {
                self.then(function() {
                    frame();
                });

            }  else {
                self.inject(function() {
                    return frame;
                }, 25);
            }

//            if (eventConfig.type === 'input') {
//
//                if (self.isEditable(target)) {
//
//                    if (Stimuli.core.Support.isWebkit) {
//
//                        self.inject(function() {
//                            return Obj.merge({
//                                type: 'textInput'
//                            }, defaultConfig);
//                        });
//
//                    }
//
//                    if (!Stimuli.core.Support.isWebkit) {
//
//                        self.then(function() {
//                            if (self.isEditableInput(target) || self.isTextArea(target)) {
//                                self.updateEditableValue(target, defaultConfig.key);
//                            } else {
//                                self.updateEditableHtml(target, defaultConfig.key);
//                            }
//                        });
//
//                        if (!Stimuli.core.Support.isIE8 && !Stimuli.core.Support.isIE9 &&
//                            !Stimuli.core.Support.isIE10 && !Stimuli.core.Support.isWebkit &&
//                            (self.isEditableInput(target) || self.isTextArea(target))) {
//                            self.inject(function() {
//                                return eventConfig;
//                            });
//                        }
//                    }
//                }

//            }
        });


        self.then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();