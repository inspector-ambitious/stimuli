'use strict';

(function() {

    Stimuli.keyboard.TypeText = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var TypeText = Stimuli.keyboard.TypeText;

    Stimuli.core.Class.mix(TypeText, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(TypeText, Stimuli.keyboard.Helper);

    TypeText.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            defaultConfig,
            target = self.getTarget();

        self.configure(function() {

            defaultConfig = {
                bubbles: true,
                cancelable: true,
                modifiers: self.viewport.getModifiers(),
                target: target
            };
        });

        Stimuli.core.Array.forEach(self.options.keys.split(''), function(key, idx) {

            self.then(function() {
                defaultConfig.key = key;
            });

            self.inject(function() {
                return Obj.merge({
                    type: 'keydown'
                }, defaultConfig);
            });

            if (self.isEditable(target)) {

                self.inject(function() {
                    return Obj.merge({
                        type: 'keypress'
                    }, defaultConfig);
                });

                if (Stimuli.core.Support.isWebkit) {

                     self.inject(function() {
                       return Obj.merge({
                             type: 'textInput'
                         }, defaultConfig);
                    });

                }

                if (idx === 0 && self.isEditableInput(target) && (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10)) {

                    self.inject(function() {
                        return Obj.merge({
                            type: 'textinput'
                        }, defaultConfig);
                    });

                }

                if (!Stimuli.core.Support.isWebkit) {

                    self.then(function() {
                        if (self.isEditableInput(target) || self.isTextArea(target)) {
                            self.updateEditableValue(target, defaultConfig.key);
                        } else {
                            self.updateEditableHtml(target, defaultConfig.key);
                        }
                    });

                    if (!Stimuli.core.Support.isIE8 && !Stimuli.core.Support.isWebkit &&
                        (self.isEditableInput(target) || self.isTextArea(target))) {
                        self.inject(function() {
                            return {
                                type: 'input',
                                bubbles: true,
                                cancelable: false,
                                target: target
                            };
                        });
                    }
                }
            }

            self.inject(function() {
                return Obj.merge({
                    type: 'keyup'
                }, defaultConfig);
            }, 25);

        });

        self.then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();