'use strict';

describe('Stimuli.command.mouse.click', function() {
    var stimuli,
        click;

    beforeEach(function() {
        stimuli = new Stimuli();
    });

    afterEach(function() {
        stimuli.destroy();
    });

    describe('click on a link to another page', function() {

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

    describe('click on a link with a hashtag', function() {

        it('should update the current hash', function(done) {

            stimuli
                .browser
                    .navigateTo('/base/test/fixtures/links.html')
                .mouse
                    .click({target: '#hashtag_link'})
                    .then(function() {
                        expect(this.getWindow().location.hash + '').to.be('#hashtaglink');
                        done();
                    });
        });

    });

});