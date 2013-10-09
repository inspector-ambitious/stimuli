'use strict';
describe('Stimuli.keyboard.Helper', function() {

    describe('isTypableCharacter', function() {
        var typables =  (
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
                'ÀÈÌÒÙàèìòùÁÉÍÓÚÝáéíóúýÂÊÎÔÛâêîôûÃÑÕãñõÄËÏÖÜŸäëïöüÿßºªØøÅåÆæÞþÐðŠšŽžИи' +
                '日本語' +
                'العربية+' +
                '0123456789' +
                '`~!@#$%^&*()-_=+[]{}<>\\/|;:\'",.?' +
                '©®™•§†‡¶½÷‰±°¢£€¥¤¡¿'
            ).split('');

        function test(key, value) {
            return function() {
                expect(Stimuli.keyboard.Helper.isTypableCharacter(key)).to.be(value);
            };
        }
        for (var i = 0; i < typables.length; i++) {
            it('should return true for ' + typables[i], test(typables[i], true));
        }
        var nottypables = ['\n', '\t', '\b', '\r', '\f'];

        for (var j = 0; j < nottypables.length; j++) {
            it('should return false for "' + nottypables[j] +'"', test(nottypables[j], false));
        }
    });

    describe.only('isEditable', function() {

        describe('inputs', function() {
            var stimuli;
            var helper;
            var test = function(elId, val) {
                return function() {
                    expect(helper.isEditable(stimuli.$('#' + elId + 'input'))).to.be(val);
                };
            };


            before(function(done) {
                stimuli = new Stimuli;
                stimuli
                    .browser
                    .navigateTo('/base/test/fixtures/inputs.html')
                    .then(function(){
                        helper = Stimuli.core.Object.merge({
                            viewport: stimuli.viewport
                        }, Stimuli.keyboard.Helper);

                        done();
                    });
            });

            after(function() {
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