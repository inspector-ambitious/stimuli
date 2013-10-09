'use strict';

describe('Stimuli.keyboard.TypeText', function() {
    var stimuli;

    beforeEach(function() {
        stimuli = new Stimuli();
    });

    afterEach(function() {
        stimuli.destroy();
    });

    describe('typing text on a textinput', function() {

        it('should fire keydown, keypress and keyup events', function(done) {
            var events = [];
            var textInput;
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/form.html')
                .then(function() {
                    textInput = this.$('#text_input');
                    textInput.focus();

                    observer = new Stimuli.event.Observer(textInput);
                    var spyFn = function(e) {
                        events.push(e.type);
                    };
                    observer.subscribe('keydown', spyFn);
                    observer.subscribe('keypress', spyFn);
                    observer.subscribe('textInput', spyFn);
                    observer.subscribe('textinput', spyFn);
                    observer.subscribe('input', spyFn);
                    observer.subscribe('keyup', spyFn);

                })
                .keyboard
                .typeText('NIC')
                .then(function() {
                    if (Stimuli.core.Support.isWebkit) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('textInput');
                        expect(events[3]).to.be('input');
                        expect(events[4]).to.be('keyup');
                        expect(events[5]).to.be('keydown');
                        expect(events[6]).to.be('keypress');
                        expect(events[7]).to.be('textInput');
                        expect(events[8]).to.be('input');
                        expect(events[9]).to.be('keyup');
                        expect(events[10]).to.be('keydown');
                        expect(events[11]).to.be('keypress');
                        expect(events[12]).to.be('textInput');
                        expect(events[13]).to.be('input');
                        expect(events[14]).to.be('keyup');
                        expect(events.length).to.be(15);
                    }

                    if (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('textinput');
                        expect(events[3]).to.be('input');
                        expect(events[4]).to.be('keyup');
                        expect(events[5]).to.be('keydown');
                        expect(events[6]).to.be('keypress');
                        expect(events[7]).to.be('textinput');
                        expect(events[8]).to.be('input');
                        expect(events[9]).to.be('keyup');
                        expect(events[10]).to.be('keydown');
                        expect(events[11]).to.be('keypress');
                        expect(events[12]).to.be('textinput');
                        expect(events[13]).to.be('input');
                        expect(events[14]).to.be('keyup');
                        expect(events.length).to.be(15);
                    }

                    if (Stimuli.core.Support.isGecko) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('input');
                        expect(events[3]).to.be('keyup');
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('input');
                        expect(events[3]).to.be('keyup');
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('input');
                        expect(events[3]).to.be('keyup');
                        expect(events.length).to.be(12);
                    }

                    observer.unsubscribeAll();
                    expect(textInput.value).to.be('NIC');
                    done();
                });
        });

    });

});