describe('Domino.event.synthetizer.Mouse', function() {

    describe('inject', function() {

        it('should inject a mouse event', function() {
            var i = 0;
            $('body').mousedown(function(e) {
               i++;
            });

            Domino.event.synthetizer.Mouse.inject({
                name: 'mousedown',
                button: 0,
                view: window,
                target: document.body
            });

            expect(i).to.be(1);
            $('body').off('mousedown');

        });

        it('should return the injected event', function() {
            var receivedEvent;
            $('body').mousedown(function(e) {
                receivedEvent = e.originalEvent;
            });

            var ret = Domino.event.synthetizer.Mouse.inject({
                name: 'mousedown',
                button: 0,
                view: window,
                target: document.body
            });

            expect(ret.event).to.be(receivedEvent);
            $('body').off('mousedown');

        });

        describe('canceled', function() {

            describe('cancelable events', function() {

                it('should return canceled: true if the event is defaultPrevented in the listener', function() {

                    $('body').mousedown(function(e) {
                        e.preventDefault();
                    });

                    var ret = Domino.event.synthetizer.Mouse.inject({
                        name: 'mousedown',
                        button: 0,
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(true);
                    $('body').off('mousedown');

                });


                it('should return canceled: false if the event is not defaultPrevented in the listener', function() {

                    $('body').mousedown(function(e) {});

                    var ret = Domino.event.synthetizer.Mouse.inject({
                        name: 'mousedown',
                        button: 0,
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);
                    $('body').off('mousedown');

                });

            });

            describe('not cancelable events', function() {

                it('should return canceled: false if the event is defaultPrevented in the listener', function() {

                    $('body').mousedown(function(e) {
                        e.preventDefault();
                    });

                    var ret = Domino.event.synthetizer.Mouse.inject({
                        name: 'mousemove',
                        button: 0,
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);
                    $('body').off('mousemove');

                });


                it('should return canceled: false if the event is not defaultPrevented in the listener', function() {

                    $('body').mousedown(function(e) {});

                    var ret = Domino.event.synthetizer.Mouse.inject({
                        name: 'mousemove',
                        button: 0,
                        view: window,
                        target: document.body
                    });

                    expect(ret.canceled).to.be(false);
                    $('body').off('mousemove');

                });

            });

        });

    });

});