'use strict';

describe('Stimuli.core.Deferable', function() {

    var deferable1, deferable2, scheduler;

    beforeEach(function(){

        var deferable = function() {};

        scheduler = new Stimuli.core.Scheduler();

        Stimuli.core.Class.mix(deferable, Stimuli.core.Deferable);

        deferable1 = new deferable();
        deferable2 = new deferable();

    });

    afterEach(function() {
        scheduler = null;
        deferable1 = null;
        deferable2 = null;
    });

    describe('initScheduler', function() {

        it('should initialize a scheduler to work as an asynchronous function scheduler with no delay by default', function() {
            deferable1.initScheduler();

            var bar = 'bar';

            var callback = function(foo) {
                bar = foo;
            };

            var fn = function(next) {
                next('foo');
            };

            deferable1.scheduler.schedule(fn, callback);

            expect(bar).to.be('foo');
        });

    });



    describe('defer', function() {

    });

    describe('then', function() {

    });

});