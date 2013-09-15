describe('Domino.event.Emitter', function() {

    var Emitter = Domino.event.Emitter;

    describe('isMouseEvent', function() {

        it('should return true when a mousevent is passed as first argument', function() {
            var mouseEvents = [
                'mousedown',
                'mouseup',
                'click',
                'dblclick',
                'mousemove',
                'mouseover',
                'mouseout',
                'mouseenter',
                'mouseleave'
            ];

            for (var i = 0; i < mouseEvents.length; i++) {
                expect(Emitter.isMouseEvent(mouseEvents[i])).to.be(true);
            }
        });

        it('should return false otherwise', function() {
            expect(Emitter.isMouseEvent('scroll')).to.be(false);
        });

    });

    describe('send', function() {

    });

});