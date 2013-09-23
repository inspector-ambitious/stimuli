describe('Stimuli.virtual.Browser', function() {
    var browser, viewport;

    beforeEach(function(done) {
        browser = new Stimuli.virtual.Browser();

        browser.navigateTo({
            url: '/base/test/statict/viewport.html'
        },
        function(err, view) {
            viewport = new Stimuli.view.Viewport(view);
            done();
        });
    });

    afterEach(function() {
        browser.close();
    });

    describe('open', function() {

    });

    describe('close', function() {

    });

});