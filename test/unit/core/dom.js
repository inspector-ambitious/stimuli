'use strict';
describe('Stimuli.core.Dom', function() {

    describe('isEditable', function() {

        describe('inputs', function() {
            var stimuli;
            var test = function(elId, val) {
                return function() {
                    expect(Stimuli.core.Dom.isEditable(stimuli.$('#' + elId + 'input'))).to.be(val);
                };
            };


            before(function(done) {
                stimuli = new Stimuli();
                stimuli
                    .browser
                    .navigateTo('/base/test/fixtures/inputs.html')
                    .then(function(){
                        done();
                    });
            });

            after(function() {
                test = null;
                stimuli.destroy();
            });


            it('should return false with a checkbox input', test('checkbox', false));

            it('should return true with a email input', test('email', true));

            it('should return true with a number input', test('number', true));

            it('should return true with a text input', test('text', true));

            it('should return false with a file input', test('file', false));

            it('should return false with a hidden input', test('hidden', false));

            it('should return false with an image input', test('image', false));

            it('should return true with a textarea input', test('textarea', true));

            it('should return false with a select input', test('select', false));
        });

    });

});