'use strict';

describe('Stimuli.mouse.DblClick', function() {
    var stimuli;

    beforeEach(function() {
        stimuli = new Stimuli();
    });

    afterEach(function() {
        stimuli.destroy();
    });

    describe('double click over a div', function() {

        it('should fire mousedown, mouseup, click, mousedown, mouseup, click, dblclick events', function(done) {
            var events = [];
            var details = [];
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/divinfront.html')
                .then(function() {
                    observer = new Stimuli.event.Observer(this.$('#blue'));

                    var spyFn = function(e) {
                        events.push(e.type);
                        details.push(e.detail);
                    };
                    observer.subscribe('mouseup', spyFn);

                    observer.subscribe('mousedown', spyFn);

                    observer.subscribe('click', spyFn);

                    observer.subscribe('dblclick', spyFn);
                })
                .mouse
                .dblclick('#blue')
                .then(function() {
                    expect(events[0]).to.be('mousedown');
                    expect(events[1]).to.be('mouseup');
                    expect(events[2]).to.be('click');
                    expect(events[3]).to.be('mousedown');
                    expect(events[4]).to.be('mouseup');
                    expect(events[5]).to.be('click');
                    expect(events[6]).to.be('dblclick');
                    expect(details[0]).to.be(1);
                    expect(details[1]).to.be(1);
                    expect(details[2]).to.be(1);
                    expect(details[3]).to.be(2);
                    expect(details[4]).to.be(2);
                    expect(details[5]).to.be(2);
                    expect(details[6]).to.be(2);
                    expect(events.length).to.be(7);
                    observer.unsubscribeAll();
                    done();
                });
        });

    });

});