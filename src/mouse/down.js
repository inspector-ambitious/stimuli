'use strict';

(function() {

    Stimuli.mouse.Down = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var Down = Stimuli.mouse.Down;

    Stimuli.core.Class.mix(Down, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Down, Stimuli.mouse.Helper);

    Down.prototype.execute = function(done) {

        var self = this,
            target, position;

        return self

            .configure(function() {

                self.options.button = self.options.button || 'left';

                target = self.getTarget();

                if (target === null) {
                    throw new Error('Stimuli.mouse.down: invalid target.');
                }

                position = self.calculateViewportCoordinates(target, self.options);

                if (position === null) {
                    throw new Error('Stimuli.mouse.down: invalid position.');
                }

            })

            .inject(function() {

                return {
                    type: 'mousedown',
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