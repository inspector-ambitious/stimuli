describe('Domino', function() {

    var getDomino = function(options) {
        return new Domino(options);
    };


    describe('getMouse', function() {

        it('should return a Domino.device.Mouse instance', function() {
            var mouse = getDomino().getMouse();
            expect(mouse instanceof Domino.device.Mouse).to.be(true);
        });

    });

});