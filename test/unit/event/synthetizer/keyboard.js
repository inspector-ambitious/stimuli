'use strict';

describe('Stimuli.event.synthetizer.keyboard', function() {

    var inject = function() {
            return Stimuli.event.synthetizer.Keyboard.inject.apply(Stimuli.event.synthetizer.Mouse, arguments);
        },
        stimuli,
        textInput,
        textInputObserver;

    before(function(done) {
        stimuli = new Stimuli();
        stimuli
            .browser
            .navigateTo('/base/test/fixtures/form.html')
            .then(function() {
                textInput = stimuli.$('#text_input');
                done();
            });

    });

    after(function() {
        stimuli.destroy();
    });

    beforeEach(function() {
        textInputObserver = new Stimuli.event.Observer(textInput);
    });

    afterEach(function() {
        textInputObserver.unsubscribeAll();
    });

    describe('inject', function() {

        if (!Stimuli.core.Support.isIE8) {

            describe('modern browsers', function() {

                it('should be able to inject a keydown event', function() {

                    var e;

                    textInputObserver.subscribe('keydown', function(ev) {
                        e = ev;
                    });

                    inject({
                        type: 'keydown',
                        key: 'A',
                        bubbles: true,
                        cancelable: true,
                        modifiers: '',
                        view: stimuli.getWindow(),
                        target: textInput
                    });


                    expect(e.keyCode).to.be(65);
                    expect(e.charCode).to.be(0);
                    expect(e.which).to.be(65);
                });

                it('should be able to inject a keypress event', function() {

                    var e;

                    textInputObserver.subscribe('keypress', function(ev) {
                        e = ev;
                    });

                    inject({
                        type: 'keypress',
                        key: 'A',
                        bubbles: true,
                        cancelable: true,
                        modifiers: '',
                        view: stimuli.getWindow(),
                        target: textInput
                    });

                    expect(e.keyCode).to.be(65);
                    expect(e.charCode).to.be(65);
                    expect(e.which).to.be(65);

                });


                it('should be able to inject a keyup event', function() {

                    var e;

                    textInputObserver.subscribe('keyup', function(ev) {
                        e = ev;
                    });

                    inject({
                        type: 'keyup',
                        key: 'A',
                        bubbles: true,
                        cancelable: true,
                        modifiers: '',
                        view: stimuli.getWindow(),
                        target: textInput
                    });

                    expect(e.keyCode).to.be(65);
                    expect(e.charCode).to.be(0);
                    expect(e.which).to.be(65);

                });

            });

        } else {

            describe('old browser (IE8)', function() {

                it('should be able to inject a keydown event', function() {

                    var e;

                    textInputObserver.subscribe('keydown', function(ev) {
                        e = ev;
                    });

                    inject({
                        type: 'keydown',
                        key: 'A',
                        bubbles: true,
                        cancelable: true,
                        modifiers: '',
                        view: stimuli.getWindow(),
                        target: textInput
                    });

                    expect(e.keyCode).to.be(65);
                    expect(typeof e.charCode === 'undefined').to.be(true);
                    expect(typeof e.which === 'undefined').to.be(true);

                });

                it('should be able to inject a keypress event', function() {

                    var e;

                    textInputObserver.subscribe('keypress', function(ev) {
                        e = ev;

                    });

                    inject({
                        type: 'keypress',
                        key: 'A',
                        bubbles: true,
                        cancelable: true,
                        modifiers: '',
                        view: stimuli.getWindow(),
                        target: textInput
                    });

                    expect(e.keyCode).to.be(65);
                    expect(typeof e.charCode === 'undefined').to.be(true);
                    expect(typeof e.which === 'undefined').to.be(true);

                });


                it('should be able to inject a keyup event', function() {

                    var e;

                    textInputObserver.subscribe('keyup', function(ev) {
                        e = ev;
                    });

                    inject({
                        type: 'keyup',
                        key: 'A',
                        bubbles: true,
                        cancelable: true,
                        modifiers: '',
                        view: stimuli.getWindow(),
                        target: textInput
                    });

                    expect(e.keyCode).to.be(65);
                    expect(typeof e.charCode === 'undefined').to.be(true);
                    expect(typeof e.which === 'undefined').to.be(true);

                });

            });

        }

    });

});
