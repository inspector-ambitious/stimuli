describe('Stimuli.view.event.Observer', function() {

    var s,
        observer,
        viewport;

    before(function(done) {
        s = new Stimuli();
        s.navigateTo('/base/test/static/viewport.html',
        function(win, next) {
            viewport = s.viewport;
            TestHelper.loadFixture(viewport, 'textinput', function() {
                next();
                done();
            });
        });
    });

    after(function() {
        s.destroy();
        viewport = null;
    });

    beforeEach(function() {
        observer = new Stimuli.view.event.Observer(viewport.$('#textinput'));
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


            Stimuli.view.event.synthetizer.Mouse.inject({
                target: viewport.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: viewport.getWindow()
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


            Stimuli.view.event.synthetizer.Mouse.inject({
                target: viewport.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: viewport.getWindow()
            });

            expect(wasCalled).to.be(true);
            expect(capturedScope).to.be(scope);
            expect(eventName).to.be('mouseover');
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

            observer.subscribe('mouseover', listener);
            observer.unsubscribe('mouseover', listener);

            Stimuli.view.event.synthetizer.Mouse.inject({
                target: viewport.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: viewport.getWindow()
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

            Stimuli.view.event.synthetizer.Mouse.inject({
                target: viewport.$('#textinput'),
                type: 'mouseover',
                button: 0,
                view: viewport.getWindow()
            });

            Stimuli.view.event.synthetizer.Mouse.inject({
                target: viewport.$('#textinput2'),
                type: 'mouseover',
                button: 0,
                view: viewport.getWindow()
            });

            expect(fn1WasCalled).to.be(false);
            expect(fn2WasCalled).to.be(false);

        });
    });

});