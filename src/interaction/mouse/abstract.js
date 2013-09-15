'use strict';

(function() {

    var ns = Domino.interaction.mouse;


    ns.Abstract = {
        
        ctor: function(options) {

            this.options = {};
            
            Domino.core.Object.merge(this.options, options);

        },

        proto: {

            getBoundingRectangle: function(element) {
                return new ns.BoundingRectangle(this.viewport, element);
            },

            getBoundingRectangleOffset: function(offset, boundingRectangle) {
                return new ns.boundingRectangleOffset(offset, boundingRectangle);
            },

            getPosition: function(target, offset) {
                var me = this,
                    boundingRectangle,
                    boundingRectangleOffset,
                    position;
                
                if (!target) {
                    me.fail('Invalid target: not found.');
                    return null;
                }

                boundingRectangle = me.getBoundingRectangle(target);

                if (!boundingRectangle.isValid()) {
                    me.fail('Invalid target: found but not visible in the viewport.');
                    return null;
                }

                offset = offset || boundingRectangle.getTargetEdge();
        
                boundingRectangleOffset = me.getBoundingRectangleOffset(offset, boundingRectangle.getXLimit(), boundingRectangle.getYLimit());

                position = new ns.Position(this.viewport, target, boundingRectangle, boundingRectangleOffset);

                if (!position.isValid()) {
                    me.fail('Invalid offset: outside target.');
                    return null;
                }

                return position;
            },

            getButton: function() {
                var isModern = Domino.core.Support.isModern,
                    buttonsMap = {
                    left: isModern ? 0 : 1,
                    middle: isModern ? 1 : 4,
                    right: 2,
                    none: undefined
                };

                return buttonsMap[this.options.button || 'left']; // Default left button
            }

        }
    };

})();
