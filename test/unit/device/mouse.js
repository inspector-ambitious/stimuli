xdescribe('Domino.device.Mouse', function() {

    var viewport,
        mouse;

    beforeEach(function() {
        var viewport = new Domino.core.Viewport();
        mouse = new Domino.device.Mouse({
            viewport: viewport
        });
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