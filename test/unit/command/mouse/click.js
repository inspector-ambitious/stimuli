'use strict';

describe('Stimuli.command.mouse.click', function() {
    var s,
        click;

    before(function(done) {
        s = new Stimuli({
            speed: 10
        });
        s.navigateTo('/base/test/fixtures/links.html')
        .then(function() {
            done();
        });
    });

    after(function() {
        s.destroy();
    });

    describe('link to another page', function() {

        it('should load the other page', function(done) {

            click = new Stimuli.command.mouse.click({
                target: '#simplediv_link'
            }, s.viewport);

            click
            .execute(function(events) {
                expect(/simplediv\.html/.test(s.getWindow().location + '')).to.be(true);
                done();
            })
            .onfailure(function(error) {
                expect(error).to.be(null);
            });

        });

    });

});