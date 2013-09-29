'use strict';

describe('Stimuli.core.Context', function() {

    this.timeout(180000);

    var iframe, context;

    beforeEach(function() {
        context = new Stimuli.core.Context();
        iframe = new Stimuli.core.Iframe(context);
    });

    afterEach(function() {
        context = null;
        iframe = null;
    });


    describe('isLoading', function() {

        it('should be loading in the next tick just after the navigation triggered by a window location change', function(done) {
                iframe
                .load('/base/test/fixtures/empty.html', function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/empty.html');
                    expect(context.getWindow().document.readyState).to.be('complete');
                })
                .then(function(next) {
                     context.getWindow().location = '/base/test/fixtures/big.html';
                     setTimeout(function() {
                        expect(context.isLoading()).to.be(true);
                        next();
                     },1);
                })
                .destroy(function() {
                    done();
                });
        });

    });
});
