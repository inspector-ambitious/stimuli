describe('Stimuli.core.Scheduler', function() {

    var clock, scheduler, speed;

    beforeEach(function() {

        scheduler = new Stimuli.core.Scheduler({

            speed: 2.0,

            delay: 200

        });

        clock = sinon.useFakeTimers();
    });

    afterEach(function() {

        clock.restore();

        clock = null;

    });

    it('should received the data and emit it at the defined scheduled speed', function() {

        var emittedId = null;

        scheduler.subscribe('data', function(data, done) {
            emittedId = data.id;
            done();
        });

        scheduler.schedule({
            id: 1
        });

        scheduler.schedule({
            id: 2
        });

        scheduler.schedule({
            id: 3
        });

        clock.tick(99);
        expect(emittedId).to.be(null);
        clock.tick(1);
        expect(emittedId).to.be(1);
        clock.tick(99);
        expect(emittedId).to.be(1);
        clock.tick(1);
        expect(emittedId).to.be(2);
        clock.tick(99);
        expect(emittedId).to.be(2);
        clock.tick(1);
        expect(emittedId).to.be(3);

    });

    describe('emitted data callbacks', function() {

        it('should execute the data callback after the listener', function(done) {
            var value = null;

            scheduler.subscribe('data', function(data, done) {
                value = 1;
                done();
            });

            scheduler.schedule({
                id: 1
            }, function() {
                expect(value).to.be(1);

            });

            clock.tick(100);
            done();

        });

        it('should support asynchronous callbacks', function() {
            var step = 0;

            scheduler.subscribe('data', function(data, done) {
                done();
            });

            scheduler.schedule({
                id: 1

            }, function(callback) {
                step = 1;
                setTimeout(function() {
                    callback();
                    step = 2;
                }, 666);
            });

            scheduler.schedule({
                id: 2
            }, function() {
                step = 3;
            });

            expect(step).to.be(0);
            clock.tick(100);
            expect(step).to.be(1);
            clock.tick(666);
            expect(step).to.be(2);
            clock.tick(100);
            expect(step).to.be(3);
        });
    });
});