describe('Stimuli', function() {

    var getStimuli = function(options) {
        return new Stimuli(options);
    };


    describe('getMouse', function() {

        it('should return a Stimuli.device.Mouse instance', function() {
            var mouse = getStimuli().getMouse();
            expect(mouse instanceof Stimuli.device.Mouse).to.be(true);
        });

    });

});