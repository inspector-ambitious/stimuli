'use strict';

describe('Stimuli.keyboard.Type', function() {
    var stimuli,
        observe,
        events,
        spyFn,
        forceFocus,
        obs;

    beforeEach(function() {
        stimuli = new Stimuli();
        events = [];
        spyFn = function(e) {
            events.push(e.type);
        };
        forceFocus = function(el) {  // ie8 may have some difficulties to focus an element
            el.focus();
            if (el !== el.ownerDocument.activeElement) {
                el.focus();
            }
        };
        observe = function(el) {
            obs =  new Stimuli.event.Observer(el);
            obs.subscribe('keydown', spyFn);
            obs.subscribe('keypress', spyFn);
            obs.subscribe('textInput', spyFn);
            obs.subscribe('textinput', spyFn);
            obs.subscribe('input', spyFn);
            obs.subscribe('keyup', spyFn);
            return obs;
        };
    });

    afterEach(function() {
        events = null;
        forceFocus = null;
        spyFn = null;
        if (obs) {
            obs.unsubscribeAll();
            obs = null;
        }
        observe = null;
        stimuli.destroy();
    });

    describe('Special keys', function() {

        describe('Enter', function() {

            describe('textarea', function() {

                it('should add a new line to the textarea input', function(done) {
                    var textarea;
                    stimuli
                        .browser
                        .navigateTo('/base/test/fixtures/textarea.html')
                        .then(function() {
                            textarea = this.$('#textarea');
                            forceFocus(textarea);
                        })
                        .keyboard
                        .typeText('ABC')
                        .type('Enter')
                        .typeText('DEF')
                        .then(function() {
                            if (Stimuli.core.Support.isIE8) {
                                expect(textarea.value).to.be('ABC\r\nDEF');
                            } else {
                                expect(textarea.value).to.be('ABC\nDEF');
                            }
                            done();
                        });
                });

            });

        });

    });

});
