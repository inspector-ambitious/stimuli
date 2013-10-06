'use strict';

describe('Stimuli.mouse.Down', function() {
    var stimuli;

    beforeEach(function() {
        stimuli = new Stimuli();
    });

    afterEach(function() {
        stimuli.destroy();
    });

    describe('pressing left button over a div', function() {

        it('should fire a mousedown event', function(done) {
            var events = [];
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/divinfront.html')
                .then(function() {
                    var observer = new Stimuli.event.Observer(this.$('#blue'));
                    var spyFn = function(e) {
                        events.push(e.type);
                    };

                    observer.once('mousedown', spyFn);

                })
                .mouse
                .down('#blue')
                .then(function() {
                    expect(events[0]).to.be('mousedown');
                    expect(events.length).to.be(1);
                    done();
                });
        });

    });

});
