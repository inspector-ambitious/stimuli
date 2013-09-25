'use strict';

describe('Stimuli.command.mouse.click', function() {
    var stimuli,
        click;

    before(function() {
        stimuli = new Stimuli();
    });

    after(function() {
        stimuli.destroy();
    });

    describe('link to another page', function() {

        it('should load the other page', function(done) {

            stimuli
            .browser
                .navigateTo('/base/test/fixtures/links.html')
            .mouse
                .click({target: '#simplediv_link'})
                .then(function() {
                    expect(/simplediv\.html$/.test(this.getWindow().location + '')).to.be(true);
                    done();
                });
        });

    });

});