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

            getTarget: function(element, boundingRectangle, boundingRectangleOffset) {
                return new ns.Target(this.viewport, element, boundingRectangle, boundingRectangleOffset);
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
