describe('Domino.device.Mouse', function() {

    var mouse;

    beforeEach(function() {
        mouse = new Domino.device.Mouse();
    });

    afterEach(function() {
        mouse = null;
    });

    describe('send', function() {

        it('should an event data with the option device: "mouse"', function(done) {

            mouse.subscribe('data', function(event) {
                expect(event.device).to.be('mouse');
                done();
            });

            mouse.send('test');
        });

    });

    describe('interactions', function() {

        var interactions = [
            'click',
            'dblclick',
            'down',
            'drag',
            'move',
            'up'
        ];

        var interaction;

        for (var i = 0; i < interactions.length; i++) {
            interaction = interactions[i];
            /*jshint loopfunc: true */
            describe(interaction, function() {

                it('should an event data with the option device: "' + interaction + '"', function(done) {
                    mouse.subscribe('data', function(event) {
                        expect(event.type).to.be(interaction);
                        done();
                    });

                    mouse[interaction]();
                });

            });
        }
    });

});