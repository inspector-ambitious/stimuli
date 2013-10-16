'use strict';

(function() {

    Stimuli.keyboard.layout.Generic = {

        getSequence: function(character) {
            var tableEntry = this.table[character],
                sequence = null;

            if (tableEntry) {
                sequence = this.patterns[tableEntry.pattern](tableEntry.keyCodes, tableEntry.characters, tableEntry.locations);
            } else if (this.unicode) {
                sequence = this.getUnicodeSequence(character);
            }

            return sequence;
        },

        getEventsFlow: function(character) {
            // if there is no way to type the character in this layout we assume the user will copy and paste the character
            return this.getSequence(character) || [{type: 'paste'}, {type: 'input', character: character}];
        }
    };

})();