describe('Stimuli.event.synthetizer.Mouse', function() {

    var body,
        bodyBinder;

    before(function() {
        body = Stimuli.$('body');
    });

    beforeEach(function() {
        bodyBinder = new Stimuli.event.Binder(body);

    });

    afterEach(function() {
        bodyBinder.allOff();
    });

    describe('inject', function() {

        it('should inject a mouse event', function() {
            var i = 0;

            bodyBinder.on('mousedown', function(e) {
               i++;
            });

            Stimuli.event.synthetizer.Mouse.inject({
                name: 'mousedown',
                button: 0,
                view: window,
                target: document.body
            });

            expect(i).to.be(1);

        });

        it('should return the injected event', function() {
            var receivedEvent;
            bodyBinder.on('mousedown', function(e) {
                receivedEvent = e;
            });

            var ret = Stimuli.event.synthetizer.Mouse.inject({
                name: 'mousedown',
                button: 0,
                view: window,
                target: document.body
            });

            expect(ret.event).to.be(receivedEvent);

        });

        describe('canceled', function() {

            describe('cancelable events', function() {

                it('should return canceled: true if the event is defaultPrevented in the listener', function() {

                    bodyBinder.on('click', function(e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                    });

                    var ret = Stimuli.event.synthetizer.Mouse.inject({
                        name: 'click',
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(true);
    
                });


                it('should return canceled: false if the event is not defaultPrevented in the listener', function() {

                    var ret = Stimuli.event.synthetizer.Mouse.inject({
                        name: 'click',
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);

                });

            });

            describe('not cancelable events', function() {

                it('should return canceled: false if the event is defaultPrevented in the listener', function() {

                    bodyBinder.on('mousemove', function(e) {
                        if (e.preventDefault) {
                            e.preventDefault();
                        } else {
                            e.returnValue = false;
                        }
                    });

                    var ret = Stimuli.event.synthetizer.Mouse.inject({
                        name: 'mousemove',
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);

                });


                it('should return canceled: false if the event is not defaultPrevented in the listener', function() {


                    var ret = Stimuli.event.synthetizer.Mouse.inject({
                        name: 'mousemove',
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);

                });

            });

        });

    });

});