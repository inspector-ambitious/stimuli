describe('Stimuli.core.Scheduler', function() {

    var clock, scheduler, speed = 2.0;

    beforeEach(function() {

        scheduler = new Stimuli.core.Scheduler({

            speed: speed,

            interval: 100

        });

        clock = sinon.useFakeTimers();
    });

    afterEach(function() {

        clock.restore();

        clock = null;

    });

    it('should received the data and emit it at the defined scheduled speed', function() {

        var emittedId = null;

        scheduler.subscribe('newframe', function(data, done) {
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

        clock.tick(99 * speed);
        expect(emittedId).to.be(null);
        clock.tick(1 * speed);
        expect(emittedId).to.be(1);
        clock.tick(99 * speed);
        expect(emittedId).to.be(1);
        clock.tick(1 * speed);
        expect(emittedId).to.be(2);
        clock.tick(99 * speed);
        expect(emittedId).to.be(2);
        clock.tick(1 * speed);
        expect(emittedId).to.be(3);

    });

    describe('emitted data callbacks', function() {

        it('should execute the data callback after the listener', function(done) {
            var value = null;

            scheduler.subscribe('newframe', function(data, done) {
                value = 1;
                done();
            });

            scheduler.schedule({
                id: 1,
                callback: function() {
                    expect(value).to.be(1);

                }
            });

            clock.tick(100 * speed);
            done();

        });

        it('should support asynchronous callbacks', function() {
            var step = 0;

            scheduler.subscribe('newframe', function(data, done) {
                done();
            });

            scheduler.schedule({
                id: 1,
                callback: function(callback) {
                    step = 1;
                    setTimeout(function() {
                        callback();
                        step = 2;
                    }, 666);
                }
            });

            scheduler.schedule({
                id: 2,
                callback: function() {
                    step = 3;
                }
            });

            expect(step).to.be(0);
            clock.tick(100 * speed);
            expect(step).to.be(1);
            clock.tick(666);
            expect(step).to.be(2);
            clock.tick(100 * speed);
            expect(step).to.be(3);
        });
    });
});