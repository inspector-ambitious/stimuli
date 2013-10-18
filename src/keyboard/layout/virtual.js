'use strict';

(function() {

    Stimuli.keyboard.layout.Virtual = {

        specialKeys: [
            'Enter',
            'Backspace'
        ],

        vkTable: {
            0: 0x30,
            1: 0x31,
            2: 0x32,
            3: 0x33,
            4: 0x34,
            5: 0x35,
            6: 0x36,
            7: 0x37,
            8: 0x38,
            9: 0x39,
            A: 0x41,
            B: 0x42,
            C: 0x43,
            D: 0x44,
            E: 0x45,
            F: 0x46,
            G: 0x47,
            H: 0x48,
            I: 0x49,
            J: 0x4A,
            K: 0x4B,
            L: 0x4C,
            M: 0x4D,
            N: 0x4E,
            O: 0x4F,
            P: 0x50,
            Q: 0x51,
            R: 0x52,
            S: 0x53,
            T: 0x54,
            U: 0x55,
            V: 0x56,
            W: 0x57,
            X: 0x58,
            Y: 0x59,
            Z: 0x5A,
            ':': 0xBA,
            ';': 0xBA,
            '+': 0xBB,
            '=': 0xBB,
            ',': 0xBC,
            '<': 0xBC,
            '-': 0xBD,
            '_': 0xBD,
            '.': 0xBE,
            '>': 0xBE,
            '/': 0xBF,
            '?': 0xBF,
            '~': 0xC0,
            '`': 0xC0,
            '[': 0xDB,
            '{': 0xDB,
            '\\': 0xDC,
            '|': 0xDC,
            '}': 0xDD,
            ']': 0xDD,
            '\'': 0xDE,
            '"': 0xDE
        },

        getEventsFlow: function(key) {
            var keyCode = this.vkTable[key.toUpperCase()] || 0;
            return [ {
                type: "keydown",
                location: 0,
                keyCode: keyCode
            }, {
                type: "keypress",
                location: 0
            }, {
                type: "input",
                character: key
            }, {
                type: "keyup",
                location: 0,
                keyCode: keyCode
            } ];
        }
    };

})();