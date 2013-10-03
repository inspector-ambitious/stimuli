'use strict';

describe('Stimuli.shared.Recorder', function() {

    var a, recorder, clock;

    beforeEach(function(){
        var ChainableClass = function() {};


        Stimuli.core.Class.mix(ChainableClass, Stimuli.core.Chainable);

        a = new ChainableClass();

        recorder = new Stimuli.shared.Recorder();

    });

    afterEach(function() {
        a = null;
        recorder = null;
    });

    it('should be able to record and replay a entire sequence of a deferable', function() {
        var clock = sinon.useFakeTimers();
        var str = '';
        var previousTime;

        a.synchronize(recorder);

        recorder
            .start('foobar');

        a
            .then(function() {
                str += '1';
            })
            .sleep(1)
            .then(function() {
                str += '2';
            })
            .sleep(2)
            .then(function() {
                str += '3';
            });


        recorder
            .stop('foobar')
            .replay('foobar', 2);

        clock.tick(9);
        expect(str).to.be('123123123');
        clock.restore();
    });

    it('should be able to record two sequences in a deferable even if they cross each others', function() {
        var clock = sinon.useFakeTimers();
        var str = '';
        var previousTime;

        a.synchronize(recorder);

        recorder.start('foobar');

        a
        .then(function() {
            str += '1';
        })
        .sleep(1)
        .then(function() {
            str += '2';
        });

        recorder.start('foobar2');

        a
        .sleep(2)
        .then(function() {
            str += '3';
        });


        recorder
            .stop('foobar')
            .stop('foobar2')
            .replay('foobar', 2)
            .replay('foobar2', 2);


        clock.tick(13);
        expect(str).to.be('12312312333');
        clock.restore();
    });

});
