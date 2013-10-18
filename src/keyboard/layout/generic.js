'use strict';

(function() {

    Stimuli.keyboard.layout.Generic = {

        specialKeys: [
            'Alt',
            'Enter',
            'Tab',
            'Backspace',
            'Control',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Esc',
            'Shift',
            'F1',
            'F2',
            'F3',
            'F4',
            'F5',
            'F6',
            'F7',
            'F8',
            'F9',
            'F10',
            'F11',
            'F12',
        ],

        getSequence: function(key) {
            var tableEntry = this.table[key],
                sequence = null;

            if (tableEntry) {
                sequence = this.patterns[tableEntry.pattern](tableEntry.keyCodes, tableEntry.characters, tableEntry.locations);
            } else if (this.unicode) {
                sequence = this.getUnicodeSequence(key);
            }

            return sequence;
        },

        getEventsFlow: function(key) {
            // if there is no way to type the character in this layout we assume the user will copy and paste the character
            return this.getSequence(key) || [{type: 'paste'}, {type: 'input', character: key}];
        }
    };

})();