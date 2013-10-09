'use strict';
describe.only('Stimuli.keyboard.Helper', function() {

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

});