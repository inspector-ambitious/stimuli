'use strict';

(function() {

    Stimuli.mouse.DblClick = function() {
        Stimuli.shared.Command.apply(this, arguments);
        this.parseOptions();
    };

    var DblClick = Stimuli.mouse.DblClick;

    Stimuli.core.Class.mix(DblClick, Stimuli.shared.Command.prototype);
    Stimuli.core.Class.mix(DblClick, Stimuli.mouse.Helper);

    DblClick.prototype.execute = function(done) {

        var self = this,
            Obj = Stimuli.core.Object,
            defaultConf,
            target, position;

        return self

            .configure(function() {

                self.options.button = 'left';

                target = self.getTarget();

                if (target === null) {
                    throw new Error('Stimuli.mouse.dblclick: invalid target.');
                }

                position = self.calculateViewportCoordinates(target, self.options);

                if (position === null) {
                    throw new Error('Stimuli.mouse.dblclick: invalid position.');
                }

                defaultConf = {
                    button: self.getButton(),
                    bubbles: true,
                    cancelable: true,
                    altKey: self.options.alt,
                    ctrlKey: self.options.ctrl,
                    shiftKey: self.options.shift,
                    metaKey: self.options.meta,
                    target: target,
                    clientX: position.clientX,
                    clientY: position.clientY,
                    screenX: position.screenX,
                    screenY: position.screenY
                };

            })

            .inject(function() {

                return Obj.merge({
                    type: 'mousedown',
                    detail: 1
                }, defaultConf);

            })

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on mousedown.';
                }
            })

            .inject(function() {

                return Obj.merge({
                    type: 'mouseup',
                    detail: 1
                }, defaultConf);

            }, 100)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on mouseup.';
                }

                self.handleClick(target);

            })

            .inject(function() {

                return Obj.merge({
                    type: 'click',
                    detail: 1
                }, defaultConf);

            }, 1)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on click.';
                }
            })

            .inject(function() {

                return Obj.merge({
                    type: 'mousedown',
                    detail: 2
                }, defaultConf);

            })

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on mousedown.';
                }
            })

            .inject(function() {

                return Obj.merge({
                    type: 'mouseup',
                    detail: 2
                }, defaultConf);

            }, 100)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on mouseup.';
                }

                self.handleClick(target);

            })

            .inject(function() {

                return Obj.merge({
                    type: 'click',
                    detail: 2
                }, defaultConf);

            }, 1)

            .then(function() {
                if (!self.isElementVisibleAt(target, position.clientX, position.clientY))  {
                    throw 'Stimuli.mouse.dblclick: target disappeared on click.';
                }
            })

            .inject(function() {

                return Obj.merge({
                    type: 'dblclick',
                    detail: 2
                }, defaultConf);

            }, 1)

            .then(function() {
                self.viewport.waitForReady(done);
            });

    };
})();