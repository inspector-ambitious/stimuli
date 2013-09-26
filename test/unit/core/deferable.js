'use strict';

describe('Stimuli.core.Deferable', function() {

    var a, b;

    beforeEach(function(){

        var DeferableClass = function() {};


        Stimuli.core.Class.mix(DeferableClass, Stimuli.core.Deferable);

        a = new DeferableClass();
        b = new DeferableClass();

    });

    afterEach(function() {
        a = null;
        b = null;
    });

    describe('initScheduler', function() {

        it('should initialize a scheduler to work as an asynchronous function scheduler with no delay by default', function() {
            a.initScheduler();

            var bar = 'bar';

            var callback = function(foo) {
                bar = foo;
            };

            var fn = function(next) {
                next('foo');
            };

            a.scheduler.schedule(fn, callback);

            expect(bar).to.be('foo');
        });

    });


    describe('defer', function() {

        it('should init a scheduler if not initialized and a function if none is set', function() {
            a.defer();
            expect(!!a.scheduler).to.be(true);
        });

    });

    describe('then', function() {

        it('should allow to chain synchronous functions', function() {
            var str = '';

            a
            .then(function() {
                str += '1';
            })
            .then(function() {
                str += '2';
            })
            .then(function() {
                str += '3';
            });

            expect(str).to.be('123');
        });

        it('should allow to chain asynchronous functions', function() {
            var str = '';

            var clock = sinon.useFakeTimers();

            var previousTime;

            a
            .then(function(done) {
                str += '1';
                previousTime = (new Date).getTime();
                setTimeout(function() {
                    done();
                }, 100);
            })
            .then(function(done) {
                expect((new Date).getTime() - previousTime).to.be(100);
                str += '2';
                previousTime = (new Date).getTime();
                setTimeout(function() {
                    done();
                }, 1);
            })
            .then(function() {
                expect((new Date).getTime() - previousTime).to.be(1);
                str += '3';
            });

            clock.tick(101);
            expect(str).to.be('123');
            clock.restore();
        });

    });

    describe('sleep', function() {

        it('should allow to wait for a defined amount of time in ms and be chainable', function() {
            var clock = sinon.useFakeTimers();
            var completed = false;
            var previousTime;

            a
            .then(function() {
                previousTime = (new Date).getTime();
            })
            .sleep(100)
            .then(function() {
                expect((new Date).getTime() - previousTime).to.be(100);
                previousTime = (new Date).getTime();
            })
            .sleep(1)
            .then(function() {
                expect((new Date).getTime() - previousTime).to.be(1);
                completed = true;
            });

            clock.tick(101);
            expect(completed).to.be(true);
            clock.restore();
        });

    });

    describe('shared scheduler', function() {

        it('should be possible to share a scheduler accross two deferables', function() {
            var str =  '';

            var clock = sinon.useFakeTimers();

            a.initScheduler();

            b.scheduler = a.scheduler;

            a
            .then(function(done) {
                setTimeout(function() {
                    str += '1';
                    done();
                }, 100);
            });

            b
            .then(function() {
                str += '2';
            })
            .then(function(done) {
                setTimeout(function() {
                    str += '3';
                    done();
                }, 500);
            })

            a
            .then(function(done) {
                setTimeout(function() {
                    str += '4';
                    done();
                }, 100);
            })
            .then(function(done) {
                setTimeout(function() {
                    str += '5';
                    done();
                }, 1);
            });

            clock.tick(1000);

            expect(str).to.be('12345');
            clock.restore();
        });

    });

});