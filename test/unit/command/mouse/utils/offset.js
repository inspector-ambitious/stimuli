describe('Stimuli.command.mouse.utils.Offset', function() {

    var Offset = Stimuli.command.mouse.utils.Offset;

    describe('with different origins', function() {

        describe('tl', function() {

            it('should translate the x,y numerical coordinates to the top left corner', function() {
                var offset = new Offset({
                    origin: 'tl',
                    x: 0,
                    y: 2
                }, 112, 56);

                expect(offset.x).to.be(0);
                expect(offset.y).to.be(2);
            });


            it('should translate the x,y percentage coordinates to the top left corner', function() {
                var offset = new Offset({
                    origin: 'tl',
                    x: '10%',
                    y: '5%'
                }, 112, 56);

                expect(offset.x).to.be(11);
                expect(offset.y).to.be(3);
            });

        });

        describe('tr', function() {

            it('should translate the x,y numerical coordinates to the top left corner', function() {
                var offset = new Offset({
                    origin: 'tr',
                    x: -2,
                    y: 2
                }, 112, 56);

                expect(offset.x).to.be(110);
                expect(offset.y).to.be(2);
            });

            it('should translate the x,y percentage coordinates to the top left corner', function() {
                var offset = new Offset({
                    origin: 'tr',
                    x: '-90%',
                    y: '5%'
                }, 112, 56);

                expect(offset.x).to.be(11);
                expect(offset.y).to.be(3);
            });

        });

        describe('br', function() {

            it('should translate the x,y numerical coordinates to the top left corner', function() {
                var offset = new Offset({
                    origin: 'br',
                    x: 0,
                    y: -2
                }, 112, 56);

                expect(offset.x).to.be(112);
                expect(offset.y).to.be(54);
            });

            it('should translate the x,y percentage coordinates to the top left corner', function() {
                var offset = new Offset({
                    origin: 'br',
                    x: '-90%',
                    y: '-95%'
                }, 112, 56);

                expect(offset.x).to.be(11);
                expect(offset.y).to.be(3);
            });

        });

        describe('bl', function() {

            it('should translate the x,y numerical coordinates to the top left corner', function() {
                var offset = new Offset({
                    origin: 'bl',
                    x: 102,
                    y: -10
                }, 112, 56);

                expect(offset.x).to.be(102);
                expect(offset.y).to.be(46);
            });

            it('should translate the x,y percentage coordinates to the top left corner', function() {
                var offset = new Offset({
                    origin: 'bl',
                    x: '10%',
                    y: '-95%'
                }, 112, 56);

                expect(offset.x).to.be(11);
                expect(offset.y).to.be(3);
            });


        });

    });

});