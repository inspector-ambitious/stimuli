describe('Domino.core.Type', function() {

    describe('isBoolean', function() {

        var isBoolean = Domino.core.Type.isBoolean;
        
        it('should return true if a boolean is passed', function() {
            expect(isBoolean(true)).to.be(true);
            expect(isBoolean(false)).to.be(true);
        });


        it('should return false otherwise', function() {
            var values = [
                'foobar',
                1,
                null,
                undefined,
                1.2,
                'false',
                'true'
            ];
            var length = values.length;
            var i = 0;

            for (; i < length; i++) {
                expect(isBoolean(values[i])).to.be(false);
            }

        });

    });

});