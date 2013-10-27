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

            describe('input', function() {

                it('should submit the form', function(done) {
                    var textinput;
                    stimuli
                        .browser
                        .navigateTo('/base/test/fixtures/form.html')
                        .then(function() {
                            textinput = this.$('#text_input');
                            forceFocus(textinput);
                        })
                        .keyboard
                        .typeText('Foobar')
                        .type('Enter')
                        .then(function() {
                            expect(this.getWindow().location + '').to.contain('/base/test/fixtures/big.html');
                            done();
                        });
                });

            });


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

            describe('editable html', function() {

                if (!Stimuli.core.Support.isIE8) {

                    describe('designMode=on', function() {

                        it('should format the html properly', function(done) {
                            var body;
                            stimuli
                                .browser
                                .navigateTo('/base/test/fixtures/design_mode.html')
                                .then(function() {
                                    body = this.$('body');
                                    forceFocus(body);
                                })
                                .keyboard
                                .typeText('foo')
                                .type('Enter')
                                .then(function() {
                                    if (Stimuli.core.Support.isWebkit) {
                                        expect(body.innerHTML).to.be('foo<div><br></div>');
                                    } else if (Stimuli.core.Support.isGecko) {
                                        expect(body.innerHTML).to.be('foo<br><br>\n');
                                    } else if (Stimuli.core.Support.isIE) {
                                        expect(body.innerHTML).to.be('<p>foo</p><p>&nbsp;</p>\n');
                                    }
                                })
                                .typeText('bar')
                                .then(function() {
                                    if (Stimuli.core.Support.isWebkit) {
                                        expect(body.innerHTML).to.be('foo<div>bar</div>');
                                    } else if (Stimuli.core.Support.isGecko) {
                                        expect(body.innerHTML).to.be('foo<br>bar<br>\n');
                                    } else if (Stimuli.core.Support.isIE) {
                                        expect(body.innerHTML).to.be('<p>foo</p><p>bar</p>\n');
                                    }
                                })
                                .type('Enter')
                                .then(function() {
                                    if (Stimuli.core.Support.isWebkit) {
                                        expect(body.innerHTML).to.be('foo<div>bar</div><div><br></div>');
                                    } else if (Stimuli.core.Support.isGecko) {
                                        expect(body.innerHTML).to.be('foo<br>bar<br><br>\n');
                                    } else if (Stimuli.core.Support.isIE) {
                                        expect(body.innerHTML).to.be('<p>foo</p><p>bar</p><p>&nbsp;</p>\n');
                                    }
                                    done();
                                });
                        });

                    });

                }

                describe('div.contentEditable=true', function() {

                    it('should format the html properly', function(done) {
                        var div;
                        stimuli
                            .browser
                            .navigateTo('/base/test/fixtures/content_editable.html')
                            .then(function() {
                                div = this.$('#content_editable');
                                forceFocus(div);
                            })
                            .keyboard
                            .typeText('foo')
                            .type('Enter')
                            .then(function() {
                                if (Stimuli.core.Support.isWebkit) {
                                    expect(div.innerHTML).to.be('foo<div><br></div>');
                                } else if (Stimuli.core.Support.isGecko) {
                                    expect(div.innerHTML).to.be('foo<br><br>');
                                } else if (Stimuli.core.Support.isIE8) {
                                    expect(div.innerHTML).to.be('<P>foo</P>\r\n<P>&nbsp;</P>');
                                } else if (Stimuli.core.Support.isIE) {
                                    expect(div.innerHTML).to.be('<p>foo</p><p>&nbsp;</p>');
                                }
                            })
                            .typeText('bar')
                            .then(function() {
                                if (Stimuli.core.Support.isWebkit) {
                                    expect(div.innerHTML).to.be('foo<div>bar</div>');
                                } else if (Stimuli.core.Support.isGecko) {
                                    expect(div.innerHTML).to.be('foo<br>bar<br>');
                                } else if (Stimuli.core.Support.isIE8) {
                                    expect(div.innerHTML).to.be('<P>foo</P>\r\n<P>bar</P>');
                                } else if (Stimuli.core.Support.isIE) {
                                    expect(div.innerHTML).to.be('<p>foo</p><p>bar</p>');
                                }
                            })
                            .type('Enter')
                            .then(function() {
                                if (Stimuli.core.Support.isWebkit) {
                                    expect(div.innerHTML).to.be('foo<div>bar</div><div><br></div>');
                                } else if (Stimuli.core.Support.isGecko) {
                                    expect(div.innerHTML).to.be('foo<br>bar<br><br>');
                                } else if (Stimuli.core.Support.isIE8) {
                                    expect(div.innerHTML).to.be('<P>foo</P>\r\n<P>bar</P>\r\n<P>&nbsp;</P>');
                                } else if (Stimuli.core.Support.isIE) {
                                    expect(div.innerHTML).to.be('<p>foo</p><p>bar</p><p>&nbsp;</p>');
                                }
                                div = null;
                                done();
                            });
                    });

                });
            });

        });

    });

});
