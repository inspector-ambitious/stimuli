'use strict';

describe('Stimuli.mouse.Click', function() {
    var stimuli;

    beforeEach(function() {
        stimuli = new Stimuli();
    });

    afterEach(function() {
        stimuli.destroy();
    });

    describe('left click over a div', function() {

        it('should fire mousedown, mouseup and click events', function(done) {
            var events = [];
            stimuli
                .browser
                .navigateTo('/base/test/fixtures/divinfront.html')
                .then(function() {
                    var observer = new Stimuli.event.Observer(this.$('#blue'));
                    var spyFn = function(e) {
                        events.push(e.type);
                    };
                    observer.once('mouseup', spyFn);

                    observer.once('mousedown', spyFn);

                    observer.once('click', spyFn);
                })
                .mouse
                .click('#blue')
                .then(function() {
                    expect(events[0]).to.be('mousedown');
                    expect(events[1]).to.be('mouseup');
                    expect(events[2]).to.be('click');
                    expect(events.length).to.be(3);
                    done();
                });
        });

    });

    describe('clicking on an anchor linking to another page', function() {

        it('should navigate to the other page', function(done) {

            stimuli
            .browser
                .navigateTo('/base/test/fixtures/links.html')
            .mouse
                .click('#simplediv_link')
                .then(function() {
                    expect(/simplediv\.html$/.test(this.getWindow().location + '')).to.be(true);
                    done();
                });
        });

        it('should not navigate to the other page if the event is default prevented', function(done) {

            stimuli
                .browser
                .navigateTo('/base/test/fixtures/links.html')
                .then(function() {
                    var eventObserver = new Stimuli.event.Observer(this.$('#simplediv_link'));
                    eventObserver.subscribe('click', function(e) {
                        if (Stimuli.core.Support.isIE8) {
                            e.returnValue = false;
                        } else {
                            e.preventDefault();
                        }
                    });
                })
                .mouse
                .click('#simplediv_link')
                .then(function() {
                    expect(/links\.html$/.test(this.getWindow().location + '')).to.be(true);
                    done();
                });
        });

    });

    describe('clicking on an anchor linking to an hashtag', function() {

        it('should update the current window hash', function(done) {

            stimuli
                .browser
                    .navigateTo('/base/test/fixtures/links.html')
                .mouse
                    .click('#hashtag_link')
                    .then(function() {
                        expect(this.getWindow().location.hash + '').to.be('#hashtaglink');
                        done();
                    });
        });

        it('should not update the current window hash if the event is default prevented', function(done) {

            stimuli
                .browser
                .navigateTo('/base/test/fixtures/links.html')
                .then(function() {
                    var eventObserver = new Stimuli.event.Observer(this.$('#hashtag_link'));
                    eventObserver.subscribe('click', function(e) {
                        if (Stimuli.core.Support.isIE8) {
                            e.returnValue = false;
                        } else {
                            e.preventDefault();
                        }
                    });
                })
                .mouse
                .click('#hashtag_link')
                .then(function() {
                    expect(this.getWindow().location.hash + '').not.to.be('#hashtaglink');
                    done();
                });
        });

    });

    describe('clicking on an input[type="submit"] inside a form', function() {

        it('should navigate to the form action', function(done) {

            stimuli
                .browser
                .navigateTo('/base/test/fixtures/form.html')
                .mouse
                .click('#submit_button')
                .then(function() {
                    expect(/big\.html$/.test(this.getWindow().location + '')).to.be(true);
                    done();
                });
        });

        it('should not navigate to the form action if the event is default prevented', function(done) {

            stimuli
                .browser
                .navigateTo('/base/test/fixtures/form.html')
                .then(function() {
                    var eventObserver = new Stimuli.event.Observer(this.$('#submit_button'));
                    eventObserver.subscribe('click', function(e) {
                        if (Stimuli.core.Support.isIE8) {
                            e.returnValue = false;
                        } else {
                            e.preventDefault();
                        }
                    });
                })
                .mouse
                .click('#submit_button')
                .then(function() {
                    expect(/form\.html$/.test(this.getWindow().location + '')).to.be(true);
                    done();
                });
        });

    });

});