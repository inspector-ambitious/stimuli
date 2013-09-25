describe('Stimuli.virtual.Browser', function() {
    var browser, viewport;

    beforeEach(function(done) {

        browser = new Stimuli.virtual.Browser();

        browser.initScheduler();

        browser.navigateTo({
            url: '/base/test/fixtures/empty.html'
        },
        function() {
            viewport =  browser.viewport;
            done();
        });
    });

    afterEach(function() {
        browser.close();
    });

    describe('pause', function() {

    });

    describe('open', function() {

    });

    describe('close', function() {

    });

});