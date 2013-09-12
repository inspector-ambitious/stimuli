describe('Domino.core.Object', function() {

    var Obj;

    beforeEach(function() {
        Obj = Domino.core.Object;
    });

    afterEach(function() {
        Obj = null;
    });

    describe('merge', function() {

        it('should not throw an error if the second arguments is null', function() {
            var a = {
                a: 1
            };

            expect(a).to.be(Obj.merge(a));

        });


        it('should merge two object properties', function() {

            var a = {
                a: 1
            };

            var b = {
                b: 2
            };

            expect(a).to.be(Obj.merge(a, b));

            expect(a.a).to.be(1);

            expect(a.b).to.be(2);

        });

    });

});