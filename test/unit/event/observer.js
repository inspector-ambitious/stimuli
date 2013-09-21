describe('Stimuli.event.Observer', function() {

    var observer,
        viewport;

    beforeEach(function(done) {
        viewport = new Stimuli.browser.Viewport();
        TestHelper.loadFixture(viewport, 'textinput', function() {
            observer = new Stimuli.event.Observer(viewport.$('#textinput'));
            done();
        });
    });

    afterEach(function() {
        TestHelper.removeFixture(viewport);
        observer.unsubscribeAll();
        observer = null;
        viewport = null;
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

            observer.subscribe('focusin', listener);

            viewport.$('#textinput').focus();

            expect(wasCalled).to.be(true);
            expect(scope).to.be(observer);
            expect(eventName).to.be('focusin');
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

            observer.subscribe('focusin', listener, scope);

            viewport.$('#textinput').focus();

            expect(wasCalled).to.be(true);
            expect(capturedScope).to.be(scope);
            expect(eventName).to.be('focusin');
        });

    });

    describe('unsubscribe', function() {


        it('should not call the listener if the listener is unsubscribed', function() {
            var wasCalled = false;
            var scope = null;
            var eventName = null;
            var listener = function(e) {
                wasCalled = true;
                scope = this;
                eventName = e.type;
            };

            observer.subscribe('focusin', listener);
            observer.unsubscribe('focusin', listener);
            viewport.$('#textinput').focus();

            expect(wasCalled).to.be(false);
            expect(scope).to.be(null);
            expect(eventName).to.be(null);

        });

        it('should remove the listeners correctly', function() {
            var fn1 = function() {};
            var fn2 = function() {};

            observer.subscribe('focusin', fn1);
            observer.subscribe('focusout', fn2);

            observer.unsubscribe('focusin', fn1);

            expect(observer.listeners.focusin.length).to.be(0);
            expect(observer.listeners.focusout.length).to.be(1);

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

            observer.subscribe('focusin', fn1);
            observer.subscribe('focusout', fn2);

            observer.unsubscribeAll();

            viewport.$('#textinput').focus();
            viewport.$('#textinput2').focus();

            expect(fn1WasCalled).to.be(false);
            expect(fn2WasCalled).to.be(false);

        });
    });

});