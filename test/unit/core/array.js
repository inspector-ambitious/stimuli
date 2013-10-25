'use strict';

describe('Stimuli.core.Array', function() {

    var array = ['a','b', 'c'];

    describe('contains', function() {



        it('should return false if the array does not contain the specified value', function() {
            expect(Stimuli.core.Array.contains(array, 'd')).to.be(false);
        });

        it('should return true if the array contains the specified value', function() {
            expect(Stimuli.core.Array.contains(array, 'b')).to.be(true);
        });

    });

    describe('forEach', function() {

        it('should iterates through the entire array, providing value, index, and the arrau to the passed function', function() {
            var tmp = [];

            Stimuli.core.Array.forEach(array, function(v, i, a) {
                tmp.push(v);
                tmp.push(i);
                tmp.push(a);
            });

            expect(tmp[0]).to.be('a');
            expect(tmp[1]).to.be(0);
            expect(tmp[2]).to.be(array);
            expect(tmp[3]).to.be('b');
            expect(tmp[4]).to.be(1);
            expect(tmp[5]).to.be(array);
            expect(tmp[6]).to.be('c');
            expect(tmp[7]).to.be(2);
            expect(tmp[8]).to.be(array);
        });

    });

});