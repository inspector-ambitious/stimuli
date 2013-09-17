describe('Stimuli.browser.Viewport', function() {

    var viewport;

    before(function() {
        viewport = new Stimuli.browser.Viewport();
    });

    after(function() {
        viewport = null;
    });

    describe('traverse', function() {

        it('should traverse the viewport pixel by pixel', function() {
            var width;
            var height;

            viewport.traverse(function(el, x, y) {
                // expect(el).to.be.ok();
                width = x;
                height = y;
            });
            
            expect(width + 1).to.be(window.innerWidth || document.documentElement.clientWidth);
            expect(height + 1).to.be(window.innerHeight || document.documentElement.clientHeight);
        });

    });

    describe('getElementAt', function() {

        it('should find and element at coordinates 0, 0', function() {
            expect(viewport.getElementAt(0,0)).not.to.be(null);
        });

    });

    describe('getView', function() {

        it('should return the window', function() {
            expect(viewport.getView()).to.be(window);
        });

    });

});