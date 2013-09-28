'use strict';

/**
 * @class Stimuli.core.History
 * @mixins Stimuli.core.Chainable
 * This class provides an abstraction layer to handle {Stimuli.virtual.Browser} History.
 * @constructor
 * @param {Stimuli.core.Context} The browser context.
 */
(function() {

    Stimuli.core.History = function(context) {
        var self = this;
        self.backwardPagesList = [];
        self.forwardPagesList = [];
        self.context = context;
        self.context.subscribe('update', self.updateBackwardPagesList, self, true);
    };

    var History = Stimuli.core.History;

    Stimuli.core.Class.mix(History, Stimuli.core.Chainable);

    /**
     * Called each time the context is updated to update the backward pages list.
     */
    History.prototype.updateBackwardPagesList = function() {
        this.backwardPagesList.push(this.context.get().location + '');
    };

    /**
     * @chainable
     * Navigates to a specified index in history (0 reload, -n backward, +n forward).
     * @param {Number} index The history index.
     * @param {Function} callback The function to call after the navigation has occured (block until page is fully
     * loaded).
     */
    History.prototype.go = function(index, callback) {
        var self = this;

        return self.defer(function(done) {
            var url;

            if (index < 0) { // back
                url = self.backwardPagesList[self.backwardPagesList.length + index - 1]; // -1 to remove current url
                if (!url) {
                    throw new Error('Stimuli.core.History: Can\'t go back.');
                }
                while(0 > index++) {
                    self.forwardPagesList.push(self.backwardPagesList.pop());
                }
            } else if (index > 0) { // forward
                url = self.forwardPagesList[self.forwardPagesList.length - index];
                if (!url) {
                    throw new Error('Stimuli.core.History: Can\'t go forward.');
                }
                while(0 < index--) {
                    self.backwardPagesList.push(self.forwardPagesList.pop());
                }

            } else {
                url = self.context.get().location.href;
            }
            self.context.unsubscribe('update', self.updateBackwardPagesList);

            // the global history.go doesn't work on firefox inside an iframe
            self.context.get().location = url;

            self.context.once('update', function() {
                self.context.subscribe('update', self.updateBackwardPagesList, self);
                done();
            });
        }, callback);

    };

    /**
     * @chainable
     * Destroys the saved history.
     * @param {Function} callback The function to call after history is destroyed.
     */
    History.prototype.destroy = function(callback) {
        var self = this;

        return self.defer(function(done) {
            self.backwardPagesList = [];
            self.forwardPagesList = [];
            done();
        }, callback);

    };

})();