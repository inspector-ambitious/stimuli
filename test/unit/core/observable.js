describe('Stimuli.core.Observable', function() {

    var observable;

    beforeEach(function() {

        var ObservableClass = function() {};

        Stimuli.core.Object.merge(ObservableClass.prototype, Stimuli.core.Observable);

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

    describe('once', function() {

        it('should fire the listener only once', function() {
            var i = 0;

            var listener = function() {
                i++;
            };

            observable.once('event1', listener);

            observable.publish('event1');
            observable.publish('event1');
            expect(i).to.be(1);
        });

        it('should not throw an error if called many times', function() {
            var str = '';

            var listener1 = function() {
                str += '1';
            };

            var listener2 = function() {
                str += '2';
            };

            observable.once('event1', listener1);
            observable.once('event1', listener2);

            observable.publish('event1');
            observable.publish('event1');
            observable.publish('event1');
            expect(str).to.be('12');
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

        it('should not call the listener if the listener is unsubscribed and binded with once', function() {

            var arg1 = null;
            var arg2 = null;
            var arg3 = null;

            var listener = function(a, b, c) {
                arg1 = a;
                arg2 = b;
                arg3 = c;
            };

            observable.once('event1', listener);

            observable.unsubscribe('event1', listener);

            observable.publish('event1', 1, 2, 3);

            expect(arg1).to.be(null);
            expect(arg2).to.be(null);
            expect(arg3).to.be(null);

        });

        it('should remove the listeners correctly', function() {
            var fn1 = function() {};
            var fn2 = function() {};

            observable.subscribe('ev1', fn1);
            observable.subscribe('ev2', fn2);

            observable.unsubscribe('ev1', fn1);

            expect(observable.listeners.ev1.length).to.be(0);
            expect(observable.listeners.ev2.length).to.be(1);
            expect(observable.listeners.ev2[0].fn).to.be(fn2);


        });


    });

});