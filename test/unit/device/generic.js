describe('Stimuli.device.Generic', function() {

    var dummy;

    beforeEach(function() {

        var DummyDevice = function(options) {
            this.name = 'dummy';
        };

        Stimuli.utils.Object.merge(DummyDevice.prototype, Stimuli.device.Generic);

        dummy = new DummyDevice();
    });

    afterEach(function() {
        dummy = null;
    });

    describe('send', function() {

        it('should send the command in the correct format', function(done) {

            var options = {
                foobar: true
            };

            var cb = function() {
                return 1;
            };

            dummy.subscribe('command', function(event) {
                expect(event.device).to.be('dummy');
                expect(event.command).to.be('test');
                expect(event.options).to.be(options);
                expect(event.callback).to.be(cb);
                done();
            });

            dummy.send('test', options, cb);

        });

    });


});