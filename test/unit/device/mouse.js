describe('Domino.device.Mouse', function() {

    var mouse;

    beforeEach(function() {
        mouse = new Domino.device.Mouse();
    });

    afterEach(function() {
        mouse = null;
    });

    it('should emit a leftClick', function(done) {

        mouse.subscribe('emit', function(event) {
            expect(event.device).to.be('mouse');
            expect(event.action).to.be('leftClick');
            event.callback();
        });

        mouse.leftClick({}, function() {
            done();
        });

    });

    it('should emit a rightClick', function(done) {

        mouse.subscribe('emit', function(event) {
            expect(event.device).to.be('mouse');
            expect(event.action).to.be('rightClick');
            event.callback();
        });

        mouse.rightClick({}, function() {
            done();
        });

    });

    it('should emit a middleClick', function(done) {

        mouse.subscribe('emit', function(event) {
            expect(event.device).to.be('mouse');
            expect(event.action).to.be('middleClick');
            event.callback();
        });

        mouse.middleClick({}, function() {
            done();
        });

    });

});