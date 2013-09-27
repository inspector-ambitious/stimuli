'use strict';
(function() {

    Stimuli.core.History = function(context) {
        var self = this;
        self.backwardPagesList = [];
        self.forwardPagesList = [];
        self.context = context;
        self.context.subscribe('update', self.updateBackwardPagesList, self, true);
    };

    var History = Stimuli.core.History;

    Stimuli.core.Class.mix(History, Stimuli.core.Deferable);

    History.prototype.updateBackwardPagesList = function() {
        this.backwardPagesList.push(this.context.get().location + '');
    };

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

    History.prototype.destroy = function(callback) {
        var self = this;

        return self.defer(function(done) {
            self.backwardPagesList = [];
            self.forwardPagesList = [];
            done();
        }, callback);

    };

})();