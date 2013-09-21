describe('Stimuli.utils.Class', function() {
    
    describe('A inherit B', function() {
        var A,
            B;

        before(function() {
            B = function() {
                this.foobar = true;
            };

            B.prototype.foo = function() {
                this.foobar = false;
            };

            A = Stimuli.utils.Class.inherit(B);

        });

        it('should inherit constructor', function() {
            var a = new A();
            expect(a.foobar).to.be(true);
        });

        it('should inherit prototype', function() {
            var a = new A();
            var b = new B();

            a.foo();
            expect(a.foobar).to.be(false);
            expect(b.foobar).to.be(true);

        });
    });

    describe('mix', function() {

        it('should mix a class with the desired mixin', function() {
            var A = function() {
                this.foobar = true;
            };

            A.prototype.foo = function() {
                this.foobar = true;
            };

            Stimuli.utils.Class.mix(A, {
                unfoo: function() {
                    this.foobar = false;
                }
            });

            var a = new A();

            expect(a.foobar).to.be(true);
            a.unfoo();
            expect(a.foobar).to.be(false);
            a.foo();
            expect(a.foobar).to.be(true);
        });

    });
});