describe('Domino.event.synthetizer.Mouse', function() {

    var body,
        bodyBinder;

    before(function() {
        body = Domino.$('body');
    });

    beforeEach(function() {
        bodyBinder = new Domino.event.Binder(body);

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

            Domino.event.synthetizer.Mouse.inject({
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

            var ret = Domino.event.synthetizer.Mouse.inject({
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

                    bodyBinder.on('mousedown', function(e) {
                        e.preventDefault();
                    });

                    var ret = Domino.event.synthetizer.Mouse.inject({
                        name: 'mousedown',
                        button: 0,
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(true);
    
                });


                it('should return canceled: false if the event is not defaultPrevented in the listener', function() {

                    bodyBinder.on('mousedown', function(e) {});

                    var ret = Domino.event.synthetizer.Mouse.inject({
                        name: 'mousedown',
                        button: 0,
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);

                });

            });

            describe('not cancelable events', function() {

                it('should return canceled: false if the event is defaultPrevented in the listener', function() {

                    bodyBinder.on('mousemove', function(e) {
                        e.preventDefault();
                    });

                    var ret = Domino.event.synthetizer.Mouse.inject({
                        name: 'mousemove',
                        button: 0,
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);

                });


                it('should return canceled: false if the event is not defaultPrevented in the listener', function() {


                    var ret = Domino.event.synthetizer.Mouse.inject({
                        name: 'mousemove',
                        button: 0,
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);

                });

            });

        });

    });

});