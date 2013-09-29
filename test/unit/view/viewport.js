'use strict';

describe('Stimuli.view.Viewport', function() {

    var stimuli, viewport;

    before(function(done) {
        stimuli = (new Stimuli);
        stimuli
        .browser
            .navigateTo('/base/test/fixtures/divinfront.html')
            .then(function() {
                viewport = this.viewport;
                done();
            });
    });

    after(function() {
        stimuli.destroy();
        viewport = null;
    });

    describe('getVisibleElementAt', function() {

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