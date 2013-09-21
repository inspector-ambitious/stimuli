describe('Stimuli.browser.Viewport', function() {

    var viewport;

    beforeEach(function(done) {
        Stimuli.browser.Browser.createViewport({
            url: '/base/test/static/viewport.html'
        },
        function(err, vport) {
            viewport = vport;
            done();
        });
    });

    afterEach(function() {
        Stimuli.browser.Browser.destroyViewport(viewport);
        viewport = null;
    });

    describe('getVisibleElementAt', function() {

        beforeEach(function(done) {
            TestHelper.loadFixture(viewport, 'divinfront', function() {
                done();
            });
        });

        afterEach(function() {
            TestHelper.removeFixture(viewport);
        });

        it('should find the #yellow_10x10_10x10 element at coordinates 19, 19', function() {
            var el = viewport.$('#yellow');
            expect(viewport.getVisibleElementAt(10, 10)).to.be(el);
            expect(viewport.getVisibleElementAt(10, 11)).to.be(el);
            expect(viewport.getVisibleElementAt(19, 10)).to.be(el);
            expect(viewport.getVisibleElementAt(19, 19)).to.be(el);
        });


        it('should find the edges of blue', function() {
            var el = viewport.$('#blue');

            expect(viewport.getVisibleElementAt(0, 0)).to.be(el);
            expect(viewport.getVisibleElementAt(0, 49)).to.be(el);
            expect(viewport.getVisibleElementAt(49, 0)).to.be(el);
            expect(viewport.getVisibleElementAt(49, 49)).to.be(el);
        });

    });

});