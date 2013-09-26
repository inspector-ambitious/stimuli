'use strict';

describe('Stimuli.core.Iframe', function() {

    describe('load', function() {

        it('should fire the event only when the loaded page is fully loaded', function(done) {
            var iframe = new Stimuli.core.Iframe();

            iframe.subscribe('loaded', function(win) {
                expect(!!win.document.body).to.be(true);
                expect(!!win.document.getElementById('blue')).to.be(true);
                iframe.destroy();
                done();
            });

            iframe.load('/base/test/fixtures/divinfront.html');
        });

    });

    describe('destroy', function() {

        it('should remove the iframe from the body', function(done) {
            var iframe = new Stimuli.core.Iframe();

            iframe.subscribe('loaded', function(win) {
                iframe.destroy();
                expect(document.getElementsByTagName('iframe').length).to.be(0);
                done();
            });

            iframe.load('/base/test/fixtures/divinfront.html');
        });

    });


});