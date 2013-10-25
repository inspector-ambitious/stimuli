'use strict';

describe('Stimuli.keyboard.TypeText', function() {
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

    describe('a simple div', function() {

        it('should fire keydown and keyup events only', function(done) {
            var body;
            var observer;
            var html;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/simplediv.html')
                .then(function() {
                    body = this.$('body');
                    html = body.innerHTML;
                    forceFocus(body);
                    observer = observe(body);
                })
                .keyboard
                .typeText('Ni1')
                .then(function() {
                    if (Stimuli.core.Support.isIOS || Stimuli.core.Support.isAndroid) {
                        expect(events[0]).to.be('keydown'); // shift pressed
                        expect(events[1]).to.be('keypress');
                        expect(events[2]).to.be('keyup');
                        expect(events[3]).to.be('keydown');//i
                        expect(events[4]).to.be('keypress');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keydown');//1
                        expect(events[7]).to.be('keypress');
                        expect(events[8]).to.be('keyup');
                        expect(events.length).to.be(9);
                    } else {
                        expect(events[0]).to.be('keydown'); // shift pressed
                        expect(events[1]).to.be('keydown'); //N
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('keyup');
                        expect(events[4]).to.be('keyup'); // shift released
                        expect(events[5]).to.be('keydown');//i
                        expect(events[6]).to.be('keypress');
                        expect(events[7]).to.be('keyup');
                        expect(events[8]).to.be('keydown');//1
                        expect(events[9]).to.be('keypress');
                        expect(events[10]).to.be('keyup');
                        expect(events.length).to.be(11);
                    }
                    expect(html).to.be(body.innerHTML);  // should not edit the body html
                    done();
                });
        });

    });


    describe('input[type="text"]', function() {

        it('should fire keydown, keypress and keyup events', function(done) {
            var textInput;
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/form.html')
                .then(function() {
                    textInput = this.$('#text_input');
                    forceFocus(textInput);
                    observer = observe(textInput);
                })
                .keyboard
                .typeText('Ni1')
                .then(function() {
                    if (Stimuli.core.Support.isWebkit) {
                        if (Stimuli.core.Support.isIOS || Stimuli.core.Support.isAndroid) {
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
                        } else {
                            expect(events[0]).to.be('keydown'); // shift pressed
                            expect(events[1]).to.be('keydown');
                            expect(events[2]).to.be('keypress');
                            expect(events[3]).to.be('textInput');
                            expect(events[4]).to.be('input');
                            expect(events[5]).to.be('keyup');
                            expect(events[6]).to.be('keyup'); // shift released
                            expect(events[7]).to.be('keydown');
                            expect(events[8]).to.be('keypress');
                            expect(events[9]).to.be('textInput');
                            expect(events[10]).to.be('input');
                            expect(events[11]).to.be('keyup');
                            expect(events[12]).to.be('keydown');
                            expect(events[13]).to.be('keypress');
                            expect(events[14]).to.be('textInput');
                            expect(events[15]).to.be('input');
                            expect(events[16]).to.be('keyup');
                            expect(events.length).to.be(17);
                        }
                    }

                    if (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keydown');
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('textinput');
                        expect(events[4]).to.be('input');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keyup');
                        expect(events[7]).to.be('keydown');
                        expect(events[8]).to.be('keypress');
                        expect(events[9]).to.be('textinput');
                        expect(events[10]).to.be('input');
                        expect(events[11]).to.be('keyup');
                        expect(events[12]).to.be('keydown');
                        expect(events[13]).to.be('keypress');
                        expect(events[14]).to.be('textinput');
                        expect(events[15]).to.be('input');
                        expect(events[16]).to.be('keyup');
                        expect(events.length).to.be(17);
                    }

                    if (Stimuli.core.Support.isGecko) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keydown');
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('input');
                        expect(events[4]).to.be('keyup');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keydown');
                        expect(events[7]).to.be('keypress');
                        expect(events[8]).to.be('input');
                        expect(events[9]).to.be('keyup');
                        expect(events[10]).to.be('keydown');
                        expect(events[11]).to.be('keypress');
                        expect(events[12]).to.be('input');
                        expect(events[13]).to.be('keyup');
                        expect(events.length).to.be(14);
                    }

                    if (Stimuli.core.Support.isIE8) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keydown');
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('keyup');
                        expect(events[4]).to.be('keyup');
                        expect(events[5]).to.be('keydown');
                        expect(events[6]).to.be('keypress');
                        expect(events[7]).to.be('keyup');
                        expect(events[8]).to.be('keydown');
                        expect(events[9]).to.be('keypress');
                        expect(events[10]).to.be('keyup');
                        expect(events.length).to.be(11);
                    }
                    expect(textInput.value).to.be('Ni1');
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
                    forceFocus(textinput);
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
            var textarea;
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/textarea.html')
                .then(function() {
                    textarea = this.$('#textarea');
                    forceFocus(textarea);
                    observer = observe(textarea);
                })
                .keyboard
                .typeText('Ni1')
                .then(function() {
                    if (Stimuli.core.Support.isWebkit) {
                        if (Stimuli.core.Support.isIOS || Stimuli.core.Support.isAndroid) {
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
                        } else {
                            expect(events[0]).to.be('keydown'); // shift pressed
                            expect(events[1]).to.be('keydown');
                            expect(events[2]).to.be('keypress');
                            expect(events[3]).to.be('textInput');
                            expect(events[4]).to.be('input');
                            expect(events[5]).to.be('keyup');
                            expect(events[6]).to.be('keyup'); // shift released
                            expect(events[7]).to.be('keydown');
                            expect(events[8]).to.be('keypress');
                            expect(events[9]).to.be('textInput');
                            expect(events[10]).to.be('input');
                            expect(events[11]).to.be('keyup');
                            expect(events[12]).to.be('keydown');
                            expect(events[13]).to.be('keypress');
                            expect(events[14]).to.be('textInput');
                            expect(events[15]).to.be('input');
                            expect(events[16]).to.be('keyup');
                            expect(events.length).to.be(17);
                        }
                    }

                    if (Stimuli.core.Support.isIE9 || Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keydown');
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('textinput');
                        expect(events[4]).to.be('input');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keyup');
                        expect(events[7]).to.be('keydown');
                        expect(events[8]).to.be('keypress');
                        expect(events[9]).to.be('textinput');
                        expect(events[10]).to.be('input');
                        expect(events[11]).to.be('keyup');
                        expect(events[12]).to.be('keydown');
                        expect(events[13]).to.be('keypress');
                        expect(events[14]).to.be('textinput');
                        expect(events[15]).to.be('input');
                        expect(events[16]).to.be('keyup');
                        expect(events.length).to.be(17);
                    }

                    if (Stimuli.core.Support.isGecko) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keydown');
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('input');
                        expect(events[4]).to.be('keyup');
                        expect(events[5]).to.be('keyup');
                        expect(events[6]).to.be('keydown');
                        expect(events[7]).to.be('keypress');
                        expect(events[8]).to.be('input');
                        expect(events[9]).to.be('keyup');
                        expect(events[10]).to.be('keydown');
                        expect(events[11]).to.be('keypress');
                        expect(events[12]).to.be('input');
                        expect(events[13]).to.be('keyup');
                        expect(events.length).to.be(14);
                    }

                    if (Stimuli.core.Support.isIE8) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keydown');
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('keyup');
                        expect(events[4]).to.be('keyup');
                        expect(events[5]).to.be('keydown');
                        expect(events[6]).to.be('keypress');
                        expect(events[7]).to.be('keyup');
                        expect(events[8]).to.be('keydown');
                        expect(events[9]).to.be('keypress');
                        expect(events[10]).to.be('keyup');
                        expect(events.length).to.be(11);
                    }
                    expect(textarea.value).to.be('Ni1');
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
                    forceFocus(textarea);
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
            var div;
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/content_editable.html')
                .then(function() {
                    div = this.$('#content_editable');
                    forceFocus(div);
                    observer = observe(div);
                })
                .keyboard
                .typeText('Ni1')
                .then(function() {
                    if (Stimuli.core.Support.isWebkit) {
                        if (Stimuli.core.Support.isIOS || Stimuli.core.Support.isAndroid) {
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
                        } else {
                            expect(events[0]).to.be('keydown'); // shift pressed
                            expect(events[1]).to.be('keydown');
                            expect(events[2]).to.be('keypress');
                            expect(events[3]).to.be('textInput');
                            expect(events[4]).to.be('input');
                            expect(events[5]).to.be('keyup');
                            expect(events[6]).to.be('keyup'); // shift released
                            expect(events[7]).to.be('keydown');
                            expect(events[8]).to.be('keypress');
                            expect(events[9]).to.be('textInput');
                            expect(events[10]).to.be('input');
                            expect(events[11]).to.be('keyup');
                            expect(events[12]).to.be('keydown');
                            expect(events[13]).to.be('keypress');
                            expect(events[14]).to.be('textInput');
                            expect(events[15]).to.be('input');
                            expect(events[16]).to.be('keyup');
                            expect(events.length).to.be(17);
                        }
                    }

                    if (Stimuli.core.Support.isIE8 || Stimuli.core.Support.isIE9 ||
                        Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11 ||
                        Stimuli.core.Support.isGecko) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keydown');
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('keyup');
                        expect(events[4]).to.be('keyup');
                        expect(events[5]).to.be('keydown');
                        expect(events[6]).to.be('keypress');
                        expect(events[7]).to.be('keyup');
                        expect(events[8]).to.be('keydown');
                        expect(events[9]).to.be('keypress');
                        expect(events[10]).to.be('keyup');
                        expect(events.length).to.be(11);
                    }
                    expect(div.innerHTML).to.be('Ni1');
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
                    forceFocus(div);
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
            var body;
            var observer;
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/design_mode.html')
                .then(function() {
                    body = this.$('body');
                    forceFocus(body);
                    observer = observe(body);
                })
                .keyboard
                .typeText('Ni1')
                .then(function() {
                    if (Stimuli.core.Support.isWebkit) {
                        if (Stimuli.core.Support.isIOS || Stimuli.core.Support.isAndroid) {
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
                        } else {
                            expect(events[0]).to.be('keydown'); // shift pressed
                            expect(events[1]).to.be('keydown');
                            expect(events[2]).to.be('keypress');
                            expect(events[3]).to.be('textInput');
                            expect(events[4]).to.be('input');
                            expect(events[5]).to.be('keyup');
                            expect(events[6]).to.be('keyup'); // shift released
                            expect(events[7]).to.be('keydown');
                            expect(events[8]).to.be('keypress');
                            expect(events[9]).to.be('textInput');
                            expect(events[10]).to.be('input');
                            expect(events[11]).to.be('keyup');
                            expect(events[12]).to.be('keydown');
                            expect(events[13]).to.be('keypress');
                            expect(events[14]).to.be('textInput');
                            expect(events[15]).to.be('input');
                            expect(events[16]).to.be('keyup');
                            expect(events.length).to.be(17);
                        }
                    }

                    if (Stimuli.core.Support.isIE8 || Stimuli.core.Support.isIE9 ||
                        Stimuli.core.Support.isIE10 || Stimuli.core.Support.isIE11 ||
                        Stimuli.core.Support.isGecko) {
                        expect(events[0]).to.be('keydown');
                        expect(events[1]).to.be('keydown');
                        expect(events[2]).to.be('keypress');
                        expect(events[3]).to.be('keyup');
                        expect(events[4]).to.be('keyup');
                        expect(events[5]).to.be('keydown');
                        expect(events[6]).to.be('keypress');
                        expect(events[7]).to.be('keyup');
                        expect(events[8]).to.be('keydown');
                        expect(events[9]).to.be('keypress');
                        expect(events[10]).to.be('keyup');
                        expect(events.length).to.be(11);
                    }
                    if (Stimuli.core.Support.isWebkit) {
                        expect(body.innerHTML).to.be('Ni1');
                    } else {
                        expect(body.innerHTML).to.be('\nNi1');
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
                    forceFocus(body);
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