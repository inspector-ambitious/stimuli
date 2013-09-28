'use strict';
describe('Stimuli.core.History', function() {
    this.timeout(15000);
    var history, iframe, context;

    beforeEach(function() {
        context = new Stimuli.core.Context();
        iframe = new Stimuli.core.Iframe(context);
        history = new Stimuli.core.History(context);
        history.synchronize(iframe);
    });

    afterEach(function() {
        iframe.destroy();
        iframe = null;
        history = null;
        context = null;
    });

    describe('go', function() {

        describe('backward', function() {

            it('should throw an error if you try to go backward when no navigation has occurred', function() {
                try {
                    history.go(-1);
                } catch(e) {
                    expect(e.toString()).to.contain('Stimuli.core.History: Can\'t go back.');
                    history.scheduler.unlock();
                }
            });

            it('should throw an error if you try to go backward when only one navigation has occurred', function(done) {

                var backupOnError = window.onerror;

                window.onerror = function(e) {

                    window.onerror = backupOnError;

                    setTimeout(function() { // the expectation test will be executed outside onerror
                        expect(e.toString()).to.contain('Stimuli.core.History: Can\'t go back.');
                        history.scheduler.unlock();
                        history.destroy();
                        done();
                    }, 1);

                };


                iframe.load('/base/test/fixtures/divinfront.html');
                history.go(-1);

            });

            it('should not throw an error if you try to go backward when only two navigations have occurred', function(done) {
                iframe
                    .load('/base/test/fixtures/divinfront.html')
                    .load('/base/test/fixtures/links.html');

                history
                    .sleep(500)
                    .go(-1)
                    .then(function() {
                        expect(context.get().location + '').to.contain('/base/test/fixtures/divinfront.html');
                        done();
                    });

            });


            it('should throw an error if you try to go backward twice when only two navigations have occurred', function(done) {

                var backupOnError = window.onerror;

                window.onerror = function(e) {

                    window.onerror = backupOnError;

                    setTimeout(function() { // the expectation test will be executed outside onerror
                        expect(e.toString()).to.contain('Stimuli.core.History: Can\'t go back.');
                        history.scheduler.unlock();
                        history.destroy();
                        done();
                    }, 1);

                };

                iframe
                    .load('/base/test/fixtures/divinfront.html')
                    .load('/base/test/fixtures/links.html');
                history
                    .go(-1)
                    .go(-1);

            });

        });

       describe('forward', function() {

            it('should throw an error if you try to go forward when no navigation has occurred', function() {
                try {
                    history.go(1);
                } catch(e) {
                    expect(e.toString()).to.contain('Stimuli.core.History: Can\'t go forward.');
                    history.scheduler.unlock();
                }
            });

            it('should throw an error if you try to go forward when only one navigation has occurred', function(done) {

                var backupOnError = window.onerror;

                window.onerror = function(e) {

                    window.onerror = backupOnError;

                    setTimeout(function() { // the expectation test will be executed outside onerror
                        expect(e.toString()).to.contain('Stimuli.core.History: Can\'t go forward.');
                        history.scheduler.unlock();
                        history.destroy();
                        done();
                    }, 1);

                };

                iframe.load('/base/test/fixtures/divinfront.html');
                history.go(1);

            });

            it('should not throw an error if you went backward one time', function(done) {
                iframe
                    .load('/base/test/fixtures/divinfront.html')
                    .load('/base/test/fixtures/links.html');
                history
                    .go(-1)
                    .go(1)
                    .then(function() {
                        expect(context.get().location + '').to.contain('/base/test/fixtures/links.html');
                        done();
                    });

            });

            it('should not throw an error if you went backward two times and want to go forward two times', function(done) {
                iframe
                    .load('/base/test/fixtures/divinfront.html')
                    .load('/base/test/fixtures/links.html')
                    .load('/base/test/fixtures/empty.html');
                history
                    .go(-1)
                    .go(-1)
                    .go(1)
                    .then(function() {
                        expect(context.get().location + '').to.contain('/base/test/fixtures/links.html');
                    })
                    .go(1)
                    .then(function() {
                        expect(context.get().location + '').to.contain('/base/test/fixtures/empty.html');
                        done();
                    });


            });

        });

    });

});