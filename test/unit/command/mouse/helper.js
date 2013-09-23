describe('Stimuli.command.mouse.Helper', function() {
    
    var s, helper, viewport, position, options, yellow, blue;

    before(function(done) {
        s = new Stimuli();
        s.navigateTo('/base/test/static/viewport.html',
        function(win) {
            viewport = s.viewport;
            TestHelper.loadFixture(viewport, 'divinfront', function() {
                helper = {
                    viewport: viewport,
                    options: {
                        
                    }
                };
                
                yellow = viewport.$('#yellow');
                blue = viewport.$('#blue');
                Stimuli.core.Object.merge(helper, Stimuli.command.mouse.Helper);
                done();
            });
        });
    });

    after(function() {
        TestHelper.removeFixture(viewport);
        s.destroy();
        viewport = null;
        position = null;
    });

    beforeEach(function() {
        options = helper.options;
    });

    afterEach(function() {
        options = {};
    });

    describe('getTarget', function() {

        describe('no target option specified', function() {

            it('should return null', function() {
                expect(helper.getTarget()).to.be(null);
            });

        });

        describe('target option is a coordinate', function() {

            it('should return #yellow', function() {
                options.target = {
                    x: 10,
                    y: 10
                };

                expect(helper.getTarget()).to.be(yellow);
                
            });

        });

        describe('target is a function', function() {

            it('should return #yellow', function() {
    
                options.target = function() {
                    return yellow;
                };

                expect(helper.getTarget()).to.be(yellow);
            });

        });

        describe('target is a HTMLElement', function() {

            it('should return #yellow', function() {
    
                options.target = yellow;

                expect(helper.getTarget()).to.be(yellow);
            });

        });

        describe('target is not HTMLElement', function() {

            it('should return null', function() {
    
                options.target = viewport.getWindow();

                expect(helper.getTarget()).to.be(null);
            });

        });

    });

    describe('calculateViewportCoordinates', function() {
        var offset;

        beforeEach(function() {
            offset = {};
            options.target = yellow;
        });

        afterEach(function() {
            offset = null;
        });

        describe('no offset specified', function() {

            it('should return 0x0 for blue', function() {
                var coord = helper.calculateViewportCoordinates(blue);
                expect(coord.clientX).to.be(0);
                expect(coord.clientY).to.be(0);
            });

            it('should return 10x10 for yellow', function() {
                var coord = helper.calculateViewportCoordinates(yellow);
                expect(coord.clientX).to.be(10);
                expect(coord.clientY).to.be(10);
            });

        });

        describe('offset specified', function() {

            describe('only x specified', function() {

                it('should return 10x0 for blue', function() {
                    offset.x = 10;
                    var coord = helper.calculateViewportCoordinates(blue, offset);
                    expect(coord.clientX).to.be(10);
                    expect(coord.clientY).to.be(0);
                });

                it('should return 15x10 for yellow', function() {
                    offset.x = 5;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord.clientX).to.be(15);
                    expect(coord.clientY).to.be(10);
                });

                it('should return 10x10 for yellow', function() {
                    offset.x = 0;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord.clientX).to.be(10);
                    expect(coord.clientY).to.be(10);
                });

                it('should return null if x is out of bound', function() {
                    offset.x = 100;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord).to.be(null);
                });

            });

            describe('only y specified', function() {

                it('should return 0x10 for blue', function() {
                    offset.y = 10;
                    var coord = helper.calculateViewportCoordinates(blue, offset);
                    expect(coord.clientX).to.be(0);
                    expect(coord.clientY).to.be(10);
                });

                it('should return 10x15 for yellow', function() {
                    offset.y = 5;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord.clientX).to.be(10);
                    expect(coord.clientY).to.be(15);
                });

                it('should return 10x10 for yellow', function() {
                    offset.y = 0;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord.clientX).to.be(10);
                    expect(coord.clientY).to.be(10);
                });

                it('should return null if y is out of bound', function() {
                    offset.y = 100;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord).to.be(null);
                });

            });

            describe('x and y specified', function() {

                describe('with numerical values', function() {

                    it('should return 16x14 for yellow', function() {
                        offset.x = 6;
                        offset.y = 4;
                        var coord = helper.calculateViewportCoordinates(yellow, offset);
                        expect(coord.clientX).to.be(16);
                        expect(coord.clientY).to.be(14);

                    });

                });

                describe('with percentages', function() {

                      it('should return 19x19 for yellow', function() {
                        offset.x = '100%';
                        offset.y = '100%';
                        var coord = helper.calculateViewportCoordinates(yellow, offset);
                        expect(coord.clientX).to.be(19);
                        expect(coord.clientY).to.be(19);
                    });

                    it('should return 15x15 for yellow', function() {
                        offset.x = '50%';
                        offset.y = '50%';
                        var coord = helper.calculateViewportCoordinates(yellow, offset);
                        expect(coord.clientX).to.be(15);
                        expect(coord.clientY).to.be(15);
                    });

                    it('should return 10x10 for yellow', function() {
                        offset.x = '0%';
                        offset.y = '0%';
                        var coord = helper.calculateViewportCoordinates(yellow, offset);
                        expect(coord.clientX).to.be(10);
                        expect(coord.clientY).to.be(10);
                    });

                });


            });


        });

        describe('origin specified', function() {

            describe('tl', function() {

                it('should return 16x14 for yellow', function() {
                    offset.origin = 'tl';
                    offset.x = 6;
                    offset.y = 4;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord.clientX).to.be(16);
                    expect(coord.clientY).to.be(14);
                });

            });

            describe('tr', function() {

                it('should return 16x14 for yellow', function() {
                    offset.origin = 'tr';
                    offset.x = -3;
                    offset.y = 4;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord.clientX).to.be(16);
                    expect(coord.clientY).to.be(14);
                });

            });

            describe('br', function() {

                it('should return 16x14 for yellow', function() {
                    offset.origin = 'br';
                    offset.x = -3;
                    offset.y = -5;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord.clientX).to.be(16);
                    expect(coord.clientY).to.be(14);
                });

            });

            describe('bl', function() {

                it('should return 16x14 for yellow', function() {
                    offset.origin = 'bl';
                    offset.x = 6;
                    offset.y = -5;
                    var coord = helper.calculateViewportCoordinates(yellow, offset);
                    expect(coord.clientX).to.be(16);
                    expect(coord.clientY).to.be(14);
                });

            });

        });

    });

});