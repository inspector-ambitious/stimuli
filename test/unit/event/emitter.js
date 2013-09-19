describe('Stimuli.event.Emitter', function() {

    var Emitter = Stimuli.event.Emitter;


    describe('emit', function() {

        it('should return the event object and the cancelation status in the callback', function() {
            Emitter.emit({
                name: 'mousedown',
                button: 0,
                view: window,
                target: document.body
            }, function(event, canceled) {

                expect(typeof event === 'object').to.be(true);
                expect(typeof canceled === 'boolean').to.be(true);
            });
        });

    });

});