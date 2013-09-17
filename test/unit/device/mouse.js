describe('Stimuli.device.Mouse', function() {

    var mouse;

    beforeEach(function() {
        mouse = new Stimuli.device.Mouse();
    });

    afterEach(function() {
        mouse = null;
    });

    describe('send', function() {

        it('should an event command with the option device: "mouse"', function(done) {

            mouse.subscribe('command', function(event) {
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
            'up'
        ];

        var interaction;

        for (var i = 0; i < interactions.length; i++) {
            interaction = interactions[i];
            /*jshint loopfunc: true */
            describe(interaction, function() {

                it('should an event command with the option device: "' + interaction + '"', function(done) {
                    mouse.subscribe('command', function(event) {
                        expect(event.command).to.be(interaction);
                        done();
                    });

                    mouse[interaction]();
                });

            });
        }
    });

});