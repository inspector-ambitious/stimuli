'use strict';

(function() {

    Stimuli.mouse.Up = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseArguments(arguments[1]);
    };

    var Up = Stimuli.mouse.Up;

    Stimuli.core.Class.mix(Up, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Up, Stimuli.mouse.Helper);

    Up.prototype.execute = function(done) {

        var self = this,
            target, position;

        return self

            .configure(function() {

                self.options.button = self.options.button || 'left';

                target = self.getTarget();

                if (target === null) {
                    throw new Error('Stimuli.mouse.up: invalid target.');
                }

                position = self.calculateViewportCoordinates(target, self.options);

                if (position === null) {
                    throw new Error('Stimuli.mouse.up: invalid position.');
                }

            })

            .inject(function() {

                return {
                    type: 'mouseup',
                    button: self.getButton(),
                    bubbles: true,
                    cancelable: true,
                    altKey: self.viewport.getModifierState('Alt'),
                    ctrlKey: self.viewport.getModifierState('Control'),
                    shiftKey: self.viewport.getModifierState('Shift'),
                    metaKey: self.viewport.getModifierState('Meta'),
                    target: target,
                    details: 1,
                    clientX: position.clientX,
                    clientY: position.clientY,
                    screenX: position.screenX,
                    screenY: position.screenY
                };

            })

            .then(function() {
                self.viewport.waitForReady(done);
            });

    };

})();