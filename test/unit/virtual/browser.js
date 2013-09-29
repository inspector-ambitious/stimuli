'use strict';

describe('Stimuli.virtual.Browser', function() {

    var context;

    beforeEach(function() {
        context = new Stimuli.core.Context();
    });

    afterEach(function() {
        context = null;
    });


    describe('navigateTo', function() {

        it('should be able to navigate to several urls in sequence', function(done) {
            var browser = new Stimuli.virtual.Browser(context);


            browser
                .navigateTo('/base/test/fixtures/empty.html')
                .then(function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/empty.html');
                })
                .navigateTo('/base/test/fixtures/links.html')
                .then(function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/links.html');
                })
                .destroy(function() {
                    done();
                });
        });

    });

    describe('back, forward, reload', function() {

        it('should not throw any error while navigating', function(done) {
            var browser = new Stimuli.virtual.Browser(context);


            browser
                .navigateTo('/base/test/fixtures/empty.html')
                .then(function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/empty.html');
                })
                .navigateTo('/base/test/fixtures/links.html')
                .then(function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/links.html');
                })
                .back()
                .then(function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/empty.html');
                })
                .forward()
                .then(function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/links.html');
                })
                .reload()
                .then(function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/links.html');
                })
                .destroy(function() {
                    done();
                });
        });

    });

});