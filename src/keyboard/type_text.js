'use strict';

(function() {

    Stimuli.keyboard.TypeText = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.layout = arguments[1];
        this.parseArguments(arguments[2]);
    };

    var TypeText = Stimuli.keyboard.TypeText;

    Stimuli.core.Class.mix(TypeText, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(TypeText, Stimuli.keyboard.Helper);

    TypeText.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            target = self.getTarget();



        Stimuli.core.Array.forEach(self.options.keys.split(''), function(key, idx) {


            var defaultConfig = {
                bubbles: true,
                cancelable: true,
                target: target,
                key: key
            };

            var flow = self.layout.getEventsFlow(key);

            Stimuli.core.Array.forEach(flow, function(eventConfig) {
                Stimuli.core.Object.merge(eventConfig, defaultConfig);

                if (eventConfig.type === 'input') {

                    if (self.isEditable(target)) {

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
                                    return eventConfig;
                                });
                            }
                        }
                    }

                } else {
                    self.inject(function() {
                        return eventConfig;
                    }, 5);
                }
            });

        });

        self.then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();