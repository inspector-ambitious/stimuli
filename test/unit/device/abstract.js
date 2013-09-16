describe('Stimuli.device.Abstract', function() {

    var dummy;

    beforeEach(function() {

        var DummyDevice = function(options) {
            this.name = 'dummy';
        };

        Stimuli.core.Object.merge(DummyDevice.prototype, Stimuli.device.Abstract);

        dummy = new DummyDevice();
    });

    afterEach(function() {
        dummy = null;
    });

    describe('send', function() {

        it('should send the data in the correct format', function(done) {

            var data = {
                test: 1
            };

            var cb = function() {
                return 1;
            };

            dummy.subscribe('data', function(event) {
                expect(event.device).to.be('dummy');
                expect(event.type).to.be('test');
                expect(event.data).to.be(data);
                expect(event.callback).to.be(cb);
                done();
            });

            dummy.send('test', data, cb);

        });

    });


});