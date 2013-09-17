describe('Stimuli.utils.Observable', function() {

    var observable;

    beforeEach(function() {

        var ObservableClass = function() {};

        Stimuli.utils.Object.merge(ObservableClass.prototype, Stimuli.utils.Observable);

        observable = new ObservableClass();

    });

    afterEach(function() {

        observable = null;
        
    });

    describe('subscribe', function() {

        it('should call the listener when an event is published and pass all the arguments', function() {

            var arg1 = null;
            var arg2 = null;
            var arg3 = null;

            var listener = function(a, b, c) {
                arg1 = a;
                arg2 = b;
                arg3 = c;
            };

            observable.subscribe('event1', listener);

            observable.publish('event1', 1, 2, 3);

            expect(arg1).to.be(1);
            expect(arg2).to.be(2);
            expect(arg3).to.be(3);

        });

        it('should not call the listener if a different event is published', function() {

            var arg1 = null;
            var arg2 = null;
            var arg3 = null;

            var listener = function(a, b, c) {
                arg1 = a;
                arg2 = b;
                arg3 = c;
            };

            observable.subscribe('event1', listener);

            observable.publish('event2', 1, 2, 3);

            expect(arg1).to.be(null);
            expect(arg2).to.be(null);
            expect(arg3).to.be(null);

        });


    });

    describe('unsubscribe', function() {

        it('should not call the listener if the listener is unsubscribed', function() {

            var arg1 = null;
            var arg2 = null;
            var arg3 = null;

            var listener = function(a, b, c) {
                arg1 = a;
                arg2 = b;
                arg3 = c;
            };

            observable.subscribe('event1', listener);

            observable.unsubscribe('event1', listener);

            observable.publish('event1', 1, 2, 3);

            expect(arg1).to.be(null);
            expect(arg2).to.be(null);
            expect(arg3).to.be(null);

        });

    });

});