'use strict';

(function() {

    Stimuli.keyboard.layout.Generic = {

        getSequence: function(char) {
            var tableEntry = this.table[char];
            var sequence = null;

            if (tableEntry) {
                sequence = this.patterns[tableEntry.pattern](tableEntry.keyCodes, tableEntry.characters, tableEntry.locations);
            } else if (this.unicode) {
                sequence = this.getUnicodeSequence(char);
            }
            return sequence;
        },

        getEventsFlow: function(char) {
            // if there is no way to type the character in this layout we assume the user will copy and paste the character
            return this.getSequence(char) || [{type: 'paste'}, {type: 'input', char: char}];
        }
    };

})();