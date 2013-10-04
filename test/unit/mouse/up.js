'use strict';

describe('Stimuli.mouse.Up', function() {
    var stimuli;

    beforeEach(function() {
        stimuli = new Stimuli();
    });

    afterEach(function() {
        stimuli.destroy();
    });

    describe('releasing left button over a div', function() {

        it('should fire a mouseup event', function(done) {
            var events = [];
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/divinfront.html')
                .then(function() {
                    var observer = new Stimuli.event.Observer(this.$('#blue'));
                    var spyFn = function(e) {
                        events.push(e.type);
                    };

                    observer.once('mouseup', spyFn);

                })
                .mouse
                .up('#blue')
                .then(function() {
                    expect(events[0]).to.be('mouseup');
                    expect(events.length).to.be(1);
                    done();
                });
        });

    });

});