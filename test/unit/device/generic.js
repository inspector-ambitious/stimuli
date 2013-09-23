xdescribe('Stimuli.device.Generic', function() {

    var dummy,
        browser;

    beforeEach(function() {

        var DummyDevice = function(options, browser) {
            this.name = 'dummy';
            this.browser = browser;
        };
        Stimuli.core.Object.merge(DummyDevice.prototype, Stimuli.device.Generic);

        browser = new Stimuli.virtual.Browser();
        dummy = new DummyDevice({}, browser);
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
                expect(event.browser).to.be(browser);
                expect(event.command).to.be('test');
                expect(event.options).to.be(options);
                expect(event.callback).to.be(cb);
                done();
            });

            dummy.send('test', options, cb);

        });

    });


});