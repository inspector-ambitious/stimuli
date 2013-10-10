'use strict';

describe('Stimuli.keyboard.TypeText', function() {
    var stimuli;

    beforeEach(function() {
        stimuli = new Stimuli();
    });

    afterEach(function() {
        stimuli.destroy();
    });

    describe('input[type="text"]', function() {

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

                    if (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11) {
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
                        expect(events[4]).to.be('keydown');
                        expect(events[5]).to.be('keypress');
                        expect(events[6]).to.be('input');
                        expect(events[7]).to.be('keyup');
                        expect(events[8]).to.be('keydown');
                        expect(events[9]).to.be('keypress');
                        expect(events[10]).to.be('input');
                        expect(events[11]).to.be('keyup');
                        expect(events.length).to.be(12);
                    }

                    if (Stimuli.core.Support.isIE8) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('keyup');
                        expect(events[3]).to.be('keydown');
                        expect(events[4]).to.be('keypress');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keydown');
                        expect(events[7]).to.be('keypress');
                        expect(events[8]).to.be('keyup');
                        expect(events.length).to.be(9);
                    }

                    observer.unsubscribeAll();
                    expect(textInput.value).to.be('NIC');
                    done();
                });
        });

        it('should be able to enter text in two steps', function(done) {
            var textinput;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/form.html')
                .then(function() {
                    textinput = this.$('#text_input');
                    textinput.focus();
                })
                .keyboard
                .typeText('ABC')
                .typeText('DEF')
                .then(function() {
                    expect(textinput.value).to.be('ABCDEF');
                    done();
                });
        });

    });

    describe('textarea', function() {

        it('should fire keydown, keypress and keyup events', function(done) {
            var events = [];
            var textarea;
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/textarea.html')
                .then(function() {
                    textarea = this.$('#textarea');
                    textarea.focus();

                    observer = new Stimuli.event.Observer(textarea);
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

                    if (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11) {
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
                        expect(events[4]).to.be('keydown');
                        expect(events[5]).to.be('keypress');
                        expect(events[6]).to.be('input');
                        expect(events[7]).to.be('keyup');
                        expect(events[8]).to.be('keydown');
                        expect(events[9]).to.be('keypress');
                        expect(events[10]).to.be('input');
                        expect(events[11]).to.be('keyup');
                        expect(events.length).to.be(12);
                    }

                    if (Stimuli.core.Support.isIE8) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('keyup');
                        expect(events[3]).to.be('keydown');
                        expect(events[4]).to.be('keypress');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keydown');
                        expect(events[7]).to.be('keypress');
                        expect(events[8]).to.be('keyup');
                        expect(events.length).to.be(9);
                    }

                    observer.unsubscribeAll();
                    expect(textarea.value).to.be('NIC');
                    done();
                });
        });

        it('should be able to enter text in two steps', function(done) {
            var textarea;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/textarea.html')
                .then(function() {
                    textarea = this.$('#textarea');
                    textarea.focus();
                })
                .keyboard
                .typeText('ABC')
                .typeText('DEF')
                .then(function() {
                    expect(textarea.value).to.be('ABCDEF');
                    done();
                });
        });

    });

    describe('div.contentEditable=true', function() {

        it('should fire keydown, keypress and keyup events', function(done) {
            var events = [];
            var div;
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/content_editable.html')
                .then(function() {
                    div = this.$('#content_editable');
                    div.focus();
                    observer = new Stimuli.event.Observer(div);
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

                    if (Stimuli.core.Support.isIE8 || Stimuli.core.Support.isIE9 ||
                        Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11 ||
                        Stimuli.core.Support.isGecko) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('keyup');
                        expect(events[3]).to.be('keydown');
                        expect(events[4]).to.be('keypress');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keydown');
                        expect(events[7]).to.be('keypress');
                        expect(events[8]).to.be('keyup');
                        expect(events.length).to.be(9);
                    }

                    observer.unsubscribeAll();
                    expect(div.innerHTML).to.be('NIC');
                    done();
                });
        });

        it('should be able to enter text in two steps', function(done) {
            var div;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/content_editable.html')
                .then(function() {
                    div = this.$('#content_editable');
                    div.focus();
                })
                .keyboard
                .typeText('ABC')
                .typeText('DEF')
                .then(function() {
                    expect(div.innerHTML).to.be('ABCDEF');
                    done();
                });
        });

    });

    if (!Stimuli.core.Support.isIE8) {  // you can't set manually the designMode in ie8 so...
        describe('document.designMode="on"', function() {

        it('should fire keydown, keypress and keyup events', function(done) {
            var events = [];
            var body;
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/design_mode.html')
                .then(function() {
                    body = this.$('body');
                    body.focus();
                    observer = new Stimuli.event.Observer(body);
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

                    if (Stimuli.core.Support.isIE8 || Stimuli.core.Support.isIE9 ||
                        Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11 ||
                        Stimuli.core.Support.isGecko) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('keyup');
                        expect(events[3]).to.be('keydown');
                        expect(events[4]).to.be('keypress');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keydown');
                        expect(events[7]).to.be('keypress');
                        expect(events[8]).to.be('keyup');
                        expect(events.length).to.be(9);
                    }

                    observer.unsubscribeAll();
                    if (Stimuli.core.Support.isWebkit) {
                        expect(body.innerHTML).to.be('NIC');
                    } else {
                        expect(body.innerHTML).to.be('\nNIC');
                    }
                    done();
                });
        });

        it('should be able to enter text in two steps', function(done) {
            var body;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/design_mode.html')
                .then(function() {
                    body = this.$('body');
                    body.focus();
                })
                .keyboard
                .typeText('ABC')
                .typeText('DEF')
                .then(function() {
                    if (Stimuli.core.Support.isWebkit) {
                        expect(body.innerHTML).to.be('ABCDEF');
                    } else {
                        expect(body.innerHTML).to.be('\nABCDEF');
                    }
                    done();
                });
        });


    });
    }
});