describe('Domino.core.Element', function() {

    describe('addListener', function() {

    });

    describe('removeListener', function() {

    });

    describe('removeAllListeners', function() {

    });

    describe('canInteractWith', function() {

        before(function(done) {

            TestHelper.loadTemplate('/base/test/templates/can_interact_with.html', function() {
                done();
            });

        });

        after(function() {
            TestHelper.removeTemplate();
        });

        describe('template', function() {

            it('should return true', function() {
                var el = new Domino.core.Element($('#template')[0]);
                expect(el.canInteractWith()).to.be(true);
            });

        });

        describe('visible element', function() {

            it('should return true', function() {
                var el = new Domino.core.Element($('#element_visible')[0]);
                expect(el.canInteractWith()).to.be(true);
            });

        });

        describe('element with visibility: hidden', function() {

            it('should return false', function() {
                var el = new Domino.core.Element($('#element_with_visibility_hidden')[0]);
                expect(el.canInteractWith()).to.be(false);
            });

        });

        describe('element with display: none', function() {

            it('should return false', function() {
                var el = new Domino.core.Element($('#element_with_display_none')[0]);
                expect(el.canInteractWith()).to.be(false);
            });

        });

        describe('element with no size', function() {

            it('should return false', function() {
                var el = new Domino.core.Element($('#element_with_no_size')[0]);
                expect(el.canInteractWith()).to.be(false);
            });

        });

        describe('element outside of viewport', function() {

            it('should return false', function() {
                var el = new Domino.core.Element($('#element_outside_of_viewport')[0]);
                expect(el.canInteractWith()).to.be(false);
            });

        });

        describe('element fully covered by another one', function() {
            it('should return false', function() {
                var el = new Domino.core.Element($('#element_fully_covered_by_another_one')[0]);
                expect(el.canInteractWith()).to.be(false);
            });
        });

        describe('element partially covered by another one', function() {

            it('should return true', function() {
                var el = new Domino.core.Element($('#element_partially_covered_by_another_one')[0]);
                expect(el.canInteractWith()).to.be(true);
            });
        });

    });

});