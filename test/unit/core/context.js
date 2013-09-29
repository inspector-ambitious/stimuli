'use strict';

describe('Stimuli.core.Context', function() {

    var iframe, context;

    beforeEach(function() {
        context = new Stimuli.core.Context();
        iframe = new Stimuli.core.Iframe(context);
    });

    afterEach(function() {
        context = null;
        iframe = null;
    });


    describe('waitForReady', function() {

        it('should returns true just after the navigation is triggered by a window location change', function(done) {
                iframe
                .load('/base/test/fixtures/empty.html', function() {
                    expect(context.getWindow().location + '').to.contain('/base/test/fixtures/empty.html');
                    expect(context.getWindow().document.readyState).to.be('complete');
                })
                .then(function(next) {
                     context.getWindow().location = '/base/test/fixtures/big.html';
                     context.waitForReady(function() {
                         expect(context.getWindow().location + '').to.contain('/base/test/fixtures/big.html');
                         expect(context.getWindow().document.readyState).to.be('complete');
                        next();
                     });
                })
                .destroy(function() {
                    done();
                });
        });

    });
});
