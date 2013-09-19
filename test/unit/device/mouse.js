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

    describe('commands', function() {

        var commands = [
            'click',
            'dblclick',
            'down',
            'up'
        ];

        var command;

        for (var i = 0; i < commands.length; i++) {
            command = commands[i];
            /*jshint loopfunc: true */
            describe(command, function() {

                it('should send an event command with the option device: "' + command + '"', function(done) {
                    mouse.subscribe('command', function(event) {
                        expect(event.command).to.be(command);
                        done();
                    });

                    mouse[command]();
                });

            });
        }
    });

});