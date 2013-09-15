// xdescribe('Domino.core.MouseTarget', function() {

//     var viewport;

//     before(function(done) {
//         viewport = new Domino.core.Viewport();
//         TestHelper.loadTemplate('/base/test/templates/elements.html', function() {
//             done();
//         });

//     });

//     after(function() {

//         TestHelper.removeTemplate();

//     });

//     describe('isVisible', function() {

//         describe('template', function() {

//             it('should return true', function() {
//                 var target = new Domino.core.MouseTarget($('#template')[0], viewport);
//                 expect(target.isVisible()).to.be(true);
//             });

//         });

//         describe('visible element', function() {

//             it('should return true', function() {
//                 var target = new Domino.core.MouseTarget($('#element_visible')[0], viewport);
//                 expect(target.isVisible()).to.be(true);
//             });

//         });

//         describe('element with visibility: hidden', function() {

//             it('should return false', function() {
//                 var target = new Domino.core.MouseTarget($('#element_with_visibility_hidden')[0], viewport);
//                 expect(target.isVisible()).to.be(false);
//             });

//         });

//         describe('element with display: none', function() {

//             it('should return false', function() {
//                 var target = new Domino.core.MouseTarget($('#element_with_display_none')[0], viewport);
//                 expect(target.isVisible()).to.be(false);
//             });

//         });

//         describe('element with no size', function() {

//             it('should return false', function() {
//                 var target = new Domino.core.MouseTarget($('#element_with_no_size')[0], viewport);
//                 expect(target.isVisible()).to.be(false);
//             });

//         });

//         describe('element outside of viewport', function() {

//             it('should return false', function() {
//                 var target = new Domino.core.MouseTarget($('#element_outside_of_viewport')[0], viewport);
//                 expect(target.isVisible()).to.be(false);
//             });

//         });

//         describe('element fully covered by another one', function() {
//             it('should return false', function() {
//                 var target = new Domino.core.MouseTarget($('#element_fully_covered_by_another_one')[0], viewport);
//                 expect(target.isVisible()).to.be(false);
//             });
//         });

//         describe('element partially covered by another one', function() {

//             it('should return true', function() {
//                 var target = new Domino.core.MouseTarget($('#element_partially_covered_by_another_one')[0], viewport);
//                 expect(target.isVisible()).to.be(true);
//             });

//         });

//     });

//     describe('getBoundingRectangleSize', function() {

//         describe('visible element with a 50px width and a 50px height', function() {

//             it('should return 50, 50', function() {
//                 var target = new Domino.core.MouseTarget($('#element_visible')[0], viewport);
//                 var size = target.getBoundingRectangleSize();
//                 expect(size.width).to.be(50);
//                 expect(size.height).to.be(50);
//             });

//         });

//         describe('visible element with a 50px width  and a 50px height but partially covered by another one', function() {

//             it('should return 50, 50', function() {
//                 var target = new Domino.core.MouseTarget($('#element_partially_covered_by_another_one')[0], viewport);
//                 var size = target.getBoundingRectangleSize();
//                 expect(size.width).to.be(50);
//                 expect(size.height).to.be(50);
//             });

//         });

//     });


//     describe('getBoundingRectangleOffset', function() {

//         describe('#visible_element bounding rectangle offset', function() {

//             it('should get the element bouding rectangle coordinate relatives to the document', function() {
//                 var jOffset = $('#element_visible').offset();
//                 var target = new Domino.core.MouseTarget($('#element_visible')[0], viewport);
//                 var dominoOffset = target.getBoundingRectangleOffset();
//                 expect(dominoOffset.top).to.be(jOffset.top);
//                 expect(dominoOffset.left).to.be(jOffset.left);
//             });

//         });

//     });

// });