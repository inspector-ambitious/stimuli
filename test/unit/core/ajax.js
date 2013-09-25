'use strict';

describe('Stimuli.core.Ajax', function() {

    describe('request', function() {

        it('should allow to retrieve data', function(done) {

            Stimuli.core.Ajax.get('/base/test/fixtures/foo.json', function(response) {
                expect(response).to.be('{"foo": true, "bar": true}');
                done();
            });

        });

    });

});