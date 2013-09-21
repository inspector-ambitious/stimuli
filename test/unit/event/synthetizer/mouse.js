describe('Stimuli.event.synthetizer.Mouse', function() {

    var inject = function() {
            return Stimuli.event.synthetizer.Mouse.inject.apply(Stimuli.event.synthetizer.Mouse, arguments);
        },
        viewport,
        body,
        bodyObserver;

    before(function(done) {
        Stimuli.browser.Browser.createViewport({
            url: '/base/test/static/viewport.html'
        },
        function(err, vport) {
            viewport = vport;
            body = viewport.$('body');
            done();
        });
        
    });

    after(function() {
        Stimuli.browser.Browser.destroyViewport(viewport);
        viewport = null;
    });

    beforeEach(function() {
        bodyObserver = new Stimuli.event.Observer(body);

    });

    afterEach(function() {
        bodyObserver.unsubscribeAll();
    });

    describe('inject', function() {

        it('should inject a mouse event', function() {
            var i = 0;

            bodyObserver.subscribe('mousedown', function(e) {
               i++;
            });

            inject({
                type: 'mousedown',
                button: 0,
                view: viewport.getView(),
                target: viewport.getDocument().body
            });

            expect(i).to.be(1);

        });

        it('should return the injected event', function() {
            var receivedEvent;
            bodyObserver.subscribe('mousedown', function(e) {
                receivedEvent = e;
            });

            var ret = inject({
                type: 'mousedown',
                button: 0,
                view: viewport.getView(),
                target: viewport.getDocument().body
            });

            expect(ret.event).to.be(receivedEvent);

        });

    });

    describe('specifics implementations', function() {

        var div,
            divObserver;

        beforeEach(function(done) {
            TestHelper.loadFixture(viewport, 'simplediv', function(){
                div = viewport.$('#simplediv');
                divObserver = new Stimuli.event.Observer(div);
                done();
            });
        });

        afterEach(function() {
            divObserver.unsubscribeAll();
            TestHelper.removeFixture(viewport);
        });

        if (Stimuli.browser.Support.documentCreateEvent) {

            describe('when the injection is done for modernbrowsers', function() {

                describe('event bubbling', function() {

                    it('should bubbles the event when "bubbles: true" is set', function() {
                        var wasListenerCalled = false;

                        bodyObserver.subscribe('mousedown', function(e) {
                            expect(e.target).to.be(div);
                            wasListenerCalled = true;
                        });

                        inject({
                            type: 'mousedown',
                            button: 0,
                            bubbles: true,
                            view: viewport.getView(),
                            target: div
                        });

                        expect(wasListenerCalled).to.be(true);

                    });

                    it('should not bubbles the event when "bubbles: false" is set', function() {
                        var wasListenerCalled = false;

                        bodyObserver.subscribe('mousedown', function(e) {
                            wasListenerCalled = true;
                        });

                        inject({
                            type: 'mousedown',
                            button: 0,
                            bubbles: false,
                            view: viewport.getView(),
                            target: div
                        });

                        expect(wasListenerCalled).to.be(false);
                    });

                });

                describe('event cancellation', function() {

                    it('should allow to cancel the event when "cancelable: true" is set', function() {
                        var wasListenerCalled = false;
                        divObserver.subscribe('mousedown', function(e) {
                            wasListenerCalled = true;
                            e.preventDefault();
                        });

                        var injection = inject({
                            type: 'mousedown',
                            button: 0,
                            cancelable: true,
                            view: viewport.getView(),
                            target: div
                        });

                        expect(wasListenerCalled).to.be(true);
                        expect(injection.canceled).to.be(true);

                    });

                    it('should not allow to cancel the event when "cancelable: false" is set', function() {
                        
                        var wasListenerCalled = false;

                        divObserver.subscribe('mousedown', function(e) {
                            wasListenerCalled = true;
                            e.preventDefault();
                        });

                        var injection = inject({
                            type: 'mousedown',
                            button: 0,
                            cancelable: false,
                            view: viewport.getView(),
                            target: div
                        });

                        expect(wasListenerCalled).to.be(true);
                        expect(injection.canceled).to.be(false);

                    });

                });

                describe('other event properties', function() {

                    it('should inject all the required properties', function() {
                        var wasListenerCalled = false;

                        divObserver.subscribe('mousedown', function(e) {
                            wasListenerCalled = true;

                            expect(e.cancelBubble).to.be(false);
           
                            expect(e.view).to.be(viewport.getView());
                            expect(e.target).to.be(div);
                            expect(e.type).to.be('mousedown');
                            expect(e.button).to.be(0);
                            expect(e.detail).to.be(1);
                            expect(e.screenX).to.be(2);
                            expect(e.screenY).to.be(3);
                            expect(e.clientX).to.be(4);
                            expect(e.clientY).to.be(5);
                            expect(e.altKey).to.be(true);
                            expect(e.ctrlKey).to.be(false);
                            expect(e.metaKey).to.be(true);
                            expect(e.shiftKey).to.be(false);
                            expect(e.relatedTarget).to.be(body);
                        });

                        var injection = inject({
                            bubbles: false,
                            cancelable: true,
                            view: viewport.getView(),
                            target: div,
                            type: 'mousedown',
                            button: 0,
                            detail: 1,
                            screenX: 2,
                            screenY: 3,
                            clientX: 4,
                            clientY: 5,
                            altKey: true,
                            crtlKey: false,
                            metaKey: true,
                            shiftKey: false,
                            relatedTarget: body
                        });

                        expect(wasListenerCalled).to.be(true);

                    });

                });

            });

        } else {

             describe('when the injection is done for old browsers', function() {

                describe('event bubbling', function() {

                    it('should bubbles the event when "bubbles: true" is set', function() {
                        var wasListenerCalled = false;

                        bodyObserver.subscribe('mousedown', function(e) {
                            expect(e.srcElement).to.be(div);
                            wasListenerCalled = true;
                        });

                        inject({
                            type: 'mousedown',
                            button: 1,
                            bubbles: true,
                            view: viewport.getView(),
                            target: div
                        });

                        expect(wasListenerCalled).to.be(true);
                    });

                    it('should not bubbles the event when "bubbles: false" is set', function() {
                        var wasListenerCalled = false;

                        bodyObserver.subscribe('click', function(e) {
                            wasListenerCalled = true;
                        });

                        inject({
                            type: 'click',
                            button: 1,
                            bubbles: false,
                            view: viewport.getView(),
                            target: div
                        });

                        expect(wasListenerCalled).to.be(false);
                    });

                });


                describe('other event properties', function() {

                    it('should inject all the required properties', function() {
                        var wasListenerCalled = false;

                        divObserver.subscribe('mousedown', function(e) {
                            wasListenerCalled = true;

                            expect(e.canBubble).to.be(false);
                            expect(e.view).to.be(viewport.getView());
                            expect(e.srcElement).to.be(div);
                            expect(e.type).to.be('mousedown');
                            expect(e.button).to.be(0);
                            expect(e.detail).to.be(1);
                            expect(e.screenX).to.be(2);
                            expect(e.screenY).to.be(3);
                            expect(e.clientX).to.be(4);
                            expect(e.clientY).to.be(5);
                            expect(e.altKey).to.be(true);
                            expect(e.ctrlKey).to.be(false);
                            expect(e.metaKey).to.be(true);
                            expect(e.shiftKey).to.be(false);
                            expect(e.toElement).to.be(body);
                        });

                        var injection = inject({
                            bubbles: false,
                            cancelable: true,
                            view: viewport.getView(),
                            target: div,
                            type: 'mousedown',
                            button: 1,
                            detail: 1,
                            screenX: 2,
                            screenY: 3,
                            clientX: 4,
                            clientY: 5,
                            altKey: true,
                            crtlKey: false,
                            metaKey: true,
                            shiftKey: false,
                            relatedTarget: body
                        });

                        expect(wasListenerCalled).to.be(true);

                    });

                });

            });
        }
    });
});