describe('Stimuli.virtual.Browser', function() {

    describe('navigateTo', function() {

        it('should be able to navigate to several urls in sequence', function(done) {
            var browser = new Stimuli.virtual.Browser();
            var viewport = new Stimuli.view.Viewport();
            browser.viewport = viewport;

            browser
                .navigateTo('/base/test/fixtures/empty.html')
                .then(function() {
                    expect(/empty\.html$/.test(viewport.getContext().location + '')).to.be(true);
                })
                .navigateTo('/base/test/fixtures/links.html')
                .then(function() {
                    expect(/links\.html$/.test(viewport.getContext().location + '')).to.be(true);

                })
                .destroy(function() {
                    done();
                });
        });

        it('should throw an error if the page doesn\'t exist', function(done) {
                var browser = new Stimuli.virtual.Browser();
                browser.viewport = new Stimuli.view.Viewport();

                var backupOnError = window.onerror;
                window.onerror = function(e) {
                    window.onerror = backupOnError;
                    setTimeout(function() { // the expectation test will be executed outside onerror
                        browser.destroy();
                        expect(e.toString()).to.contain('Stimuli.browser: Unable to navigate to url. (404) Not Found');
                        done();
                    }, 1);
                };

                browser.navigateTo('/undefined.undefined');
        });

    });

    describe('back and forward', function() {

        it('should be able to navigate to go back in history', function(done) {
            var browser = new Stimuli.virtual.Browser();
            var viewport = new Stimuli.view.Viewport();
            browser.viewport = viewport;

            browser
                .navigateTo('/base/test/fixtures/empty.html')
                .then(function() {
                    expect(/empty\.html$/.test(viewport.getContext().location + '')).to.be(true);
                })
                .navigateTo('/base/test/fixtures/links.html')
                .then(function() {
                    expect(/links\.html$/.test(viewport.getContext().location + '')).to.be(true);
                })
                .back()
                .then(function() {
                    expect(/empty\.html$/.test(viewport.getContext().location + '')).to.be(true);
                })
                .forward()
                .then(function() {
                    expect(/links\.html$/.test(viewport.getContext().location + '')).to.be(true);
                })
                .destroy(function() {
                    done();
                });
        });

    });

    describe('back only', function() {

        it('should throw an error if it\'s impossible to go back', function(done) {
            var browser = new Stimuli.virtual.Browser();
            var viewport = new Stimuli.view.Viewport();
            browser.viewport = viewport;

            var backupOnError = window.onerror;
            window.onerror = function(e) {
                window.onerror = backupOnError;
                setTimeout(function() {  // the expectation test will be executed outside onerror
                    browser.destroy();
                    expect(e.toString()).to.contain('Stimuli.browser: Can\'t go back there is no history.');
                    done();
                }, 1);
            };

            browser
                .navigateTo('/base/test/fixtures/empty.html')
                .back()
                .forward()
                .back()
                .back();

        });

    });

    describe('forward only', function() {

        it('should throw an error if it\'s impossible to go forward', function(done) {
            var browser = new Stimuli.virtual.Browser();
            var viewport = new Stimuli.view.Viewport();
            browser.viewport = viewport;

            var backupOnError = window.onerror;

            window.onerror = function(e) {
                window.onerror = backupOnError;
                setTimeout(function() { // the expectation test will be executed outside onerror
                    browser.destroy();
                    expect(e.toString()).to.contain('Stimuli.browser: Can\'t go forward there is no history.');
                    done();
                }, 1);
            };

            browser
                .navigateTo('/base/test/fixtures/empty.html')
                .back()
                .navigateTo('/base/test/fixtures/links.html')
                .back()
                .forward()
                .forward();

        });
    });

});