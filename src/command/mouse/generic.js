'use strict';

(function() {

    var ns = Stimuli.command.mouse;


    ns.Generic = {
        
        ctor: function(options) {

            this.options = {};
            
            Stimuli.utils.Object.merge(this.options, options);

        },

        proto: {

        getTarget: function() {
            
            var options = this.options,
                target = null;

            if (options.target === 'function') {
                target = options.target();
            } else {
                target = options.target || this.viewport.getElementAt(options.x, options.y);
            }

            return target;
        },

        getAltKey: function() {
            return this.options.alt || false;
        },

        getMetaKey: function() {
            return this.options.meta || false;
        },

        getCtrlKey: function() {
            return this.options.ctrl || false;
        },

        getShiftKey: function() {
            return this.options.shift || false;
        },

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
                
                var isModern = Stimuli.browser.Support.isModern,
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
