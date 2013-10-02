'use strict';

describe('Stimuli.core.Ajax', function() {

    describe('request', function() {

        it('should retrieve remote data and provide the correct status and statusText', function(done) {

            Stimuli.core.Ajax.get('/base/test/fixtures/foo.json', function(response, status, statusText) {
                expect(response).to.be('{"foo": true, "bar": true}');
                expect(status).to.be(200);
                expect(statusText).to.be('OK');
                done();
            });

        });

        it('should provide a 404 status and a "Not Found" statusText if the url doesn\'t exist', function(done) {

            Stimuli.core.Ajax.get('/undefined.undefined', function(response, status, statusText) {
                expect(status).to.be(404);
                expect(statusText).to.be('Not Found');
                done();
            });

        });

    });

});