'use strict';

describe('Stimuli.core.Iframe', function() {

    var iframe, context;

    beforeEach(function() {
        context = new Stimuli.core.Context();
        iframe = new Stimuli.core.Iframe(context);
    });

    afterEach(function() {
        context = null;
        iframe = null;
    });

    describe('load', function() {

        it('should update the context and block until the page is fully loaded', function(done) {
            iframe
            .load('/base/test/fixtures/divinfront.html', function() {
                expect(context.getWindow().location + '').to.contain('/base/test/fixtures/divinfront.html');
            })
            .destroy(function() {
                done();
            });
        });

        it('should throw an error if the page is not found', function(done) {

            var backupOnError = window.onerror;

            window.onerror = function(e) {

                window.onerror = backupOnError;

                setTimeout(function() { // the expectation test will be executed outside onerror
                    expect(e.toString()).to.contain('Failed to load url (404 Not Found)');
                    iframe.scheduler.unlock();
                    iframe.destroy();
                    done();
                }, 1);

            };

            iframe.load('/undefined.undefined');
        });

    });

    describe('destroy', function() {

        it('should remove the iframe element from the body and update the context', function(done) {
            iframe
            .load('/base/test/fixtures/divinfront.html')
            .destroy(function() {
                expect(context.getWindow()).to.be(null);
                expect(document.getElementsByTagName('iframe').length).to.be(0);
                done();
            });
        });

    });


});