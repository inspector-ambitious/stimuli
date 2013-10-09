'use strict';

(function() {

    Stimuli.mouse.Click = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var Click = Stimuli.mouse.Click;

    Stimuli.core.Class.mix(Click, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(Click, Stimuli.mouse.Helper);

    Click.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            defaultConf,
            target, position;

        return self

        .configure(function() {

            self.options.button = 'left';

            target = self.getTarget();

            if (target === null) {
                throw new Error('Stimuli.mouse.click: invalid target.');
            }

            position = self.calculateViewportCoordinates(target, self.options);

            if (position === null) {
                throw new Error('Stimuli.mouse.click: invalid position.');
            }

            defaultConf = {
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

        .inject(function() {

            return Obj.merge({type: 'mousedown'}, defaultConf);

         })

        .then(function() {
            if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                throw 'Stimuli.mouse.click: target disappeared on mousedown.';
            }
        })

        .inject(function() {

            return Obj.merge({type: 'mouseup'}, defaultConf);

        }, 100)

        .then(function() {
            if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                throw 'Stimuli.mouse.click: target disappeared on mouseup.';
            }
            self.handleClick(target);
        })

        .inject(function() {

            return Obj.merge({type: 'click'}, defaultConf);

        }, 1)

        .then(function() {
            self.viewport.waitForReady(done);
        });

    };

})();