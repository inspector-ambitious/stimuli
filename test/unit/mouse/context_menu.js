'use strict';

describe('Stimuli.mouse.ContextMenu', function() {
    var stimuli;

    beforeEach(function() {
        stimuli = new Stimuli();
    });

    afterEach(function() {
        stimuli.destroy();
    });

    describe('rigth click over a div', function() {

        it('should fire mousedown, mouseup and contextmenu events', function(done) {
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

                    observer.once('mousedown', spyFn);

                    observer.once('contextmenu', spyFn);
                })
                .mouse
                .contextmenu('#blue')
                .then(function() {
                    expect(events[0]).to.be('mousedown');
                    expect(events[1]).to.be('mouseup');
                    expect(events[2]).to.be('contextmenu');
                    expect(events.length).to.be(3);
                    done();
                });
        });

    });

});
