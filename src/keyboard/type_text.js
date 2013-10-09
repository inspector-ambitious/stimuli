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
            keys = self.options.keys,
            length = keys.length,
            i = 0,
            j = 0,
            key,
            defaultConfig,
            target;

        self.configure(function() {
            target = self.getTarget();
            defaultConfig = {
                bubbles: true,
                cancelable: true,
                modifiers: self.viewport.getModifiers(),
                target: target
            };
        });

        for (; i < length; i++) {

            /* jshint loopfunc: true */
            self.then(function() {
                defaultConfig.key = keys[j];
                j++;
            });

            self.inject(function() {
                return Obj.merge({
                    type: 'keydown'
                }, defaultConfig);
            });

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

            } else if (i === 0 &&
                      (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10)) {

                self.inject(function() {
                    return Obj.merge({
                        type: 'textinput'
                    }, defaultConfig);
                });

            }

            if (!Stimuli.core.Support.isWebkit) {

                self.then(function() {
                    self.fixInputValue(defaultConfig.target, defaultConfig.key);
                });

            if (!Stimuli.core.Support.isIE8 && !Stimuli.core.Support.isWebkit) {
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

            self.inject(function() {
                return Obj.merge({
                    type: 'keyup'
                }, defaultConfig);
            }, 25);
        }

        self.then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();