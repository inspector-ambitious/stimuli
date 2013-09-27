'use strict';

(function() {

    Stimuli.core.Context = function() {
        this.win = null;
        this.winObserver = null;
        this.loading = false;
    };

    var Context = Stimuli.core.Context;

    Stimuli.core.Class.mix(Context, Stimuli.core.Observable);

    Context.prototype.set = function(win) {
        var self = this;
        self.win = win;

        if (win) {
            self.winObserver = new Stimuli.view.event.Observer(win);
            self.winObserver.once('beforeunload', function() {
                self.loading = true;

            });
            self.winObserver.once('unload', function() {
                self.winObserver = null;
                self.win = null;

            });
            self.loading = false;
            self.publish('update');
        }

    };

    Context.prototype.get = function() {
        return this.win;
    };


    Context.prototype.isLoading = function() {
        return this.loading;
    };
})();