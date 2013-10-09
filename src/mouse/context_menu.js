'use strict';

(function() {

    Stimuli.mouse.ContextMenu = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var ContextMenu = Stimuli.mouse.ContextMenu;

    Stimuli.core.Class.mix(ContextMenu, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(ContextMenu, Stimuli.mouse.Helper);

    ContextMenu.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            defaultConf,
            target, position;

        return self

            .configure(function() {

                self.options.button = 'right';

                target = self.getTarget();

                if (target === null) {
                    throw new Error('Stimuli.mouse.contextmenu: invalid target.');
                }

                position = self.calculateViewportCoordinates(target, self.options);

                if (position === null) {
                    throw new Error('Stimuli.mouse.contextmenu: invalid position.');
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
                    throw 'Stimuli.mouse.contextmenu: target disappeared on mousedown.';
                }
            })

            .inject(function() {

                return Obj.merge({type: 'mouseup'}, defaultConf);

            }, 100)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.contextmenu: target disappeared on mouseup.';
                }
            })

            .inject(function() {

                return Obj.merge({type: 'contextmenu'}, defaultConf);

            }, 1)

            .then(function() {
                self.viewport.waitForReady(done);
            });

    };

})();