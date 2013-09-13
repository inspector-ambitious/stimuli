describe('Domino.device.Abstract', function() {

    var dummy;

    beforeEach(function() {

        var DummyDevice = function(options) {
            this.name = 'dummy';
        };

        Domino.core.Object.merge(DummyDevice.prototype, Domino.device.Abstract);

        dummy = new DummyDevice();
    });

    afterEach(function() {
        dummy = null;
    });

    it('should emit data in the correct format', function(done) {

        var options = {
            test: 1
        };

        var cb = function() {
            return 1;
        };

        dummy.subscribe('emit', function(event) {
            expect(event.device).to.be('dummy');
            expect(event.action).to.be('testaction');
            expect(event.options).to.be(options);
            expect(event.callback).to.be(cb);
            done();
        });

        dummy.send('testaction', options, cb);

    });

});