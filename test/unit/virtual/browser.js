'use strict';

describe('Stimuli.virtual.Browser', function() {

    describe('navigateTo', function() {

        it('should be able to navigate to several urls in sequence', function(done) {
            (new Stimuli())
                .browser
                    .navigateTo('/base/test/fixtures/empty.html')
                    .then(function() {
                        expect(this.getWindow().location + '').to.contain('/base/test/fixtures/empty.html');
                    })
                    .navigateTo('/base/test/fixtures/links.html')
                    .then(function() {
                        expect(this.getWindow().location + '').to.contain('/base/test/fixtures/links.html');
                    })
                    .destroy(function() {
                        done();
                    });
        });

    });

    describe('back, forward, reload', function() {

        it('should not throw any error while navigating', function(done) {
            (new Stimuli())
                .browser
                    .navigateTo('/base/test/fixtures/empty.html')
                    .then(function() {
                        expect(this.getWindow().location + '').to.contain('/base/test/fixtures/empty.html');
                    })
                    .navigateTo('/base/test/fixtures/links.html')
                    .then(function() {
                        expect(this.getWindow().location + '').to.contain('/base/test/fixtures/links.html');
                    })
                    .back()
                    .then(function() {
                        expect(this.getWindow().location + '').to.contain('/base/test/fixtures/empty.html');
                    })
                    .forward()
                    .then(function() {
                        expect(this.getWindow().location + '').to.contain('/base/test/fixtures/links.html');
                    })
                    .reload()
                    .then(function() {
                        expect(this.getWindow().location + '').to.contain('/base/test/fixtures/links.html');
                    })
                    .destroy(function() {
                        done();
                    });
        });

    });

});