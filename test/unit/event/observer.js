'use strict';

describe('Stimuli.event.Observer', function() {

    var stimuli,
        observer;

    before(function(done) {
        stimuli = (new Stimuli);
        stimuli
        .browser
            .navigateTo('/base/test/fixtures/textinput.html')
            .then(function(){
                done();
            });
    });

    after(function() {
        stimuli.destroy();
    });

    beforeEach(function() {
        observer = new Stimuli.event.Observer(stimuli.$('#textinput'));
    });

    afterEach(function() {
        observer.unsubscribeAll();
        observer = null;
    });

    describe('subscribe', function() {

        it('should call the listener with observer scope when an event is fired on the event target', function() {
            var wasCalled = false;
            var scope = null;
            var eventName = null;
            var listener = function(e) {
                wasCalled = true;
                scope = this;
                eventName = e.type;
            };

            observer.subscribe('mouseover', listener);


            Stimuli.event.synthetizer.Mouse.inject({
                target: stimuli.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: stimuli.getWindow()
            });

            expect(wasCalled).to.be(true);
            expect(scope).to.be(observer);
            expect(eventName).to.be('mouseover');
        });


        it('should call the listener with desired scope when an event is fired on the event target', function() {
            var wasCalled = false;
            var scope = {foobar: true};
            var eventName = null;
            var capturedScope = null;

            var listener = function(e) {
                wasCalled = true;
                capturedScope = this;
                eventName = e.type;
            };

            observer.subscribe('mouseover', listener, scope);


            Stimuli.event.synthetizer.Mouse.inject({
                target: stimuli.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: stimuli.getWindow()
            });

            expect(wasCalled).to.be(true);
            expect(capturedScope).to.be(scope);
            expect(eventName).to.be('mouseover');
        });

    });

    describe('once', function() {

        it('should call the listener once', function() {
            var wasCalled = false;
            var scope = {foobar: true};
            var eventName = null;
            var capturedScope = null;
            var count = 0;

            var listener = function(e) {
                wasCalled = true;
                capturedScope = this;
                eventName = e.type;
                count++;
            };

            observer.once('mouseover', listener, scope);


            Stimuli.event.synthetizer.Mouse.inject({
                target: stimuli.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: stimuli.getWindow()
            });

            Stimuli.event.synthetizer.Mouse.inject({
                target: stimuli.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: stimuli.getWindow()
            });

            expect(wasCalled).to.be(true);
            expect(capturedScope).to.be(scope);
            expect(eventName).to.be('mouseover');
            expect(count).to.be(1);
        });


    });

    describe('unsubscribe', function() {

        it('should not call a listener binded with once method', function() {
            var wasCalled = false;
            var scope = null;
            var eventName = null;
            var listener = function(e) {
                wasCalled = true;
                scope = this;
                eventName = e.type;
            };

            observer.once('mouseover', listener);
            observer.unsubscribe('mouseover', listener);

            Stimuli.event.synthetizer.Mouse.inject({
                target: stimuli.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: stimuli.getWindow()
            });

            expect(wasCalled).to.be(false);
            expect(scope).to.be(null);
            expect(eventName).to.be(null);
        });

        it('should not call the listener if the listener is unsubscribed', function() {
            var wasCalled = false;
            var scope = null;
            var eventName = null;
            var listener = function(e) {
                wasCalled = true;
                scope = this;
                eventName = e.type;
            };

            observer.subscribe('mouseover', listener);
            observer.unsubscribe('mouseover', listener);

            Stimuli.event.synthetizer.Mouse.inject({
                target: stimuli.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: stimuli.getWindow()
            });

            expect(wasCalled).to.be(false);
            expect(scope).to.be(null);
            expect(eventName).to.be(null);

        });

        it('should remove the listeners correctly', function() {
            var fn1 = function() {};
            var fn2 = function() {};

            observer.subscribe('mouseover', fn1);
            observer.subscribe('mouseout', fn2);

            observer.unsubscribe('mouseover', fn1);

            expect(observer.listeners.mouseover.length).to.be(0);
            expect(observer.listeners.mouseout.length).to.be(1);

        });

    });

    describe('unsubscribeAll', function() {

        it('should remove all the listeners', function() {
            var fn1WasCalled = false;
            var fn2WasCalled = false;
            var fn1 = function() {
                fn1WasCalled = true;
            };

            var fn2 = function() {
                fn2WasCalled = true;
            };

            observer.subscribe('mouseover', fn1);
            observer.subscribe('mouseover', fn2);

            observer.unsubscribeAll();

            Stimuli.event.synthetizer.Mouse.inject({
                target: stimuli.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: stimuli.getWindow()
            });

            Stimuli.event.synthetizer.Mouse.inject({
                target: stimuli.$('#textinput2'),
                type: 'mouseover',
                button: 0,
                view: stimuli.getWindow()
            });

            expect(fn1WasCalled).to.be(false);
            expect(fn2WasCalled).to.be(false);

        });
    });

});