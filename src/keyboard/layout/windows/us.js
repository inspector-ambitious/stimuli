"use strict";

(function() {
    var isGecko = Stimuli.core.Support.isGecko;
    var isIE = Stimuli.core.Support.isIE;
    Stimuli.keyboard.layout.windows.us = {
        unicode: false,
        patterns: [ function(keyCodes, characters, locations) {
            return [ {
                type: "keydown",
                location: locations[0],
                keyCode: keyCodes[0]
            }, {
                type: "keypress",
                location: locations[0]
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[0],
                keyCode: keyCodes[0]
            } ];
        }, function(keyCodes, characters, locations) {
            return [ {
                type: "keydown",
                location: locations[0],
                keyCode: keyCodes[0]
            }, {
                type: "keypress",
                location: locations[1]
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[0],
                keyCode: keyCodes[0]
            } ];
        }, function(keyCodes, characters, locations) {
            return [ {
                type: "keydown",
                location: locations[0],
                keyCode: keyCodes[0],
                shiftKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1],
                shiftKey: true
            }, {
                type: "keypress",
                location: locations[1],
                shiftKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[1],
                shiftKey: true
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[0]
            } ];
        }, function(keyCodes, characters, locations) {
            return [ {
                type: "keydown",
                location: locations[0],
                keyCode: keyCodes[0],
                shiftKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1],
                shiftKey: true
            }, {
                type: "keypress",
                location: locations[1],
                shiftKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[1],
                shiftKey: true
            }, {
                type: "keyup",
                location: locations[0],
                keyCode: keyCodes[0]
            } ];
        }, function(keyCodes, characters, locations) {
            return [ {
                type: "keydown",
                location: locations[0],
                keyCode: keyCodes[0],
                shiftKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1],
                shiftKey: true
            }, {
                type: "keypress",
                location: locations[2],
                shiftKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[1],
                shiftKey: true
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[0]
            } ];
        } ],
        table: {
            "0": {
                pattern: 0,
                keyCodes: [ 48 ],
                characters: [ "0" ],
                locations: [ 0 ]
            },
            "1": {
                pattern: 0,
                keyCodes: [ 49 ],
                characters: [ "1" ],
                locations: [ 0 ]
            },
            "2": {
                pattern: 0,
                keyCodes: [ 50 ],
                characters: [ "2" ],
                locations: [ 0 ]
            },
            "3": {
                pattern: 0,
                keyCodes: [ 51 ],
                characters: [ "3" ],
                locations: [ 0 ]
            },
            "4": {
                pattern: 0,
                keyCodes: [ 52 ],
                characters: [ "4" ],
                locations: [ 0 ]
            },
            "5": {
                pattern: 0,
                keyCodes: [ 53 ],
                characters: [ "5" ],
                locations: [ 0 ]
            },
            "6": {
                pattern: 0,
                keyCodes: [ 54 ],
                characters: [ "6" ],
                locations: [ 0 ]
            },
            "7": {
                pattern: 0,
                keyCodes: [ 55 ],
                characters: [ "7" ],
                locations: [ 0 ]
            },
            "8": {
                pattern: 0,
                keyCodes: [ 56 ],
                characters: [ "8" ],
                locations: [ 0 ]
            },
            "9": {
                pattern: 0,
                keyCodes: [ 57 ],
                characters: [ "9" ],
                locations: [ 0 ]
            },
            a: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 65 ],
                characters: [ "a" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            b: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 66 ],
                characters: [ "b" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            c: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 67 ],
                characters: [ "c" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            d: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 68 ],
                characters: [ "d" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            e: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 69 ],
                characters: [ "e" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            f: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 70 ],
                characters: [ "f" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            g: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 71 ],
                characters: [ "g" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            h: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 72 ],
                characters: [ "h" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            i: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 73 ],
                characters: [ "i" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            j: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 74 ],
                characters: [ "j" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            k: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 75 ],
                characters: [ "k" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            l: {
                pattern: 0,
                keyCodes: [ 76 ],
                characters: [ "l" ],
                locations: [ 0 ]
            },
            m: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 77 ],
                characters: [ "m" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            n: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 78 ],
                characters: [ "n" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            o: {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 79 ],
                characters: [ "o" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            p: {
                pattern: 0,
                keyCodes: [ 80 ],
                characters: [ "p" ],
                locations: [ 0 ]
            },
            q: {
                pattern: 0,
                keyCodes: [ 81 ],
                characters: [ "q" ],
                locations: [ 0 ]
            },
            r: {
                pattern: 0,
                keyCodes: [ 82 ],
                characters: [ "r" ],
                locations: [ 0 ]
            },
            s: {
                pattern: 0,
                keyCodes: [ 83 ],
                characters: [ "s" ],
                locations: [ 0 ]
            },
            t: {
                pattern: 0,
                keyCodes: [ 84 ],
                characters: [ "t" ],
                locations: [ 0 ]
            },
            u: {
                pattern: 0,
                keyCodes: [ 85 ],
                characters: [ "u" ],
                locations: [ 0 ]
            },
            v: {
                pattern: 0,
                keyCodes: [ 86 ],
                characters: [ "v" ],
                locations: [ 0 ]
            },
            w: {
                pattern: 0,
                keyCodes: [ 87 ],
                characters: [ "w" ],
                locations: [ 0 ]
            },
            x: {
                pattern: 0,
                keyCodes: [ 88 ],
                characters: [ "x" ],
                locations: [ 0 ]
            },
            y: {
                pattern: 0,
                keyCodes: [ 89 ],
                characters: [ "y" ],
                locations: [ 0 ]
            },
            z: {
                pattern: 0,
                keyCodes: [ 90 ],
                characters: [ "z" ],
                locations: [ 0 ]
            },
            ";": {
                pattern: 0,
                keyCodes: isGecko ? [ 59 ] : [ 186 ],
                characters: [ ";" ],
                locations: [ 0 ]
            },
            "=": {
                pattern: 0,
                keyCodes: isGecko ? [ 61 ] : [ 187 ],
                characters: [ "=" ],
                locations: [ 0 ]
            },
            ",": {
                pattern: 0,
                keyCodes: [ 188 ],
                characters: [ "," ],
                locations: [ 0 ]
            },
            "-": {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: isGecko ? [ 173 ] : [ 189 ],
                characters: [ "-" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            ".": {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 190 ],
                characters: [ "." ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            "/": {
                pattern: 0,
                keyCodes: [ 191 ],
                characters: [ "/" ],
                locations: [ 0 ]
            },
            "`": {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 192 ],
                characters: [ "`" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            "[": {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 219 ],
                characters: [ "[" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 1 ]
            },
            "\\": {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 220 ],
                characters: [ "\\" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 2 ]
            },
            "]": {
                pattern: 0,
                keyCodes: [ 221 ],
                characters: [ "]" ],
                locations: [ 0 ]
            },
            "'": {
                pattern: isIE ? 0 : isGecko ? 0 : 1,
                keyCodes: [ 222 ],
                characters: [ "'" ],
                locations: isIE ? [ 0 ] : isGecko ? [ 0 ] : [ 0, 3 ]
            },
            "*": {
                pattern: isGecko ? 0 : 1,
                keyCodes: [ 106 ],
                characters: [ "*" ],
                locations: isGecko ? [ 3 ] : [ 3, 0 ]
            },
            "+": {
                pattern: isGecko ? 0 : 1,
                keyCodes: [ 107 ],
                characters: [ "+" ],
                locations: isGecko ? [ 3 ] : [ 3, 0 ]
            },
            ")": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 48 ],
                characters: [ ")" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "!": {
                pattern: isIE ? 3 : isGecko ? 3 : 4,
                keyCodes: [ 16, 49 ],
                characters: [ "!" ],
                locations: isIE ? [ 2, 0 ] : isGecko ? [ 1, 0 ] : [ 1, 0, 3 ]
            },
            "@": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 50 ],
                characters: [ "@" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "#": {
                pattern: isIE ? 3 : isGecko ? 3 : 4,
                keyCodes: [ 16, 51 ],
                characters: [ "#" ],
                locations: isIE ? [ 2, 0 ] : isGecko ? [ 1, 0 ] : [ 1, 0, 3 ]
            },
            $: {
                pattern: isIE ? 3 : isGecko ? 3 : 4,
                keyCodes: [ 16, 52 ],
                characters: [ "$" ],
                locations: isIE ? [ 2, 0 ] : isGecko ? [ 1, 0 ] : [ 1, 0, 3 ]
            },
            "%": {
                pattern: isIE ? 3 : isGecko ? 3 : 4,
                keyCodes: [ 16, 53 ],
                characters: [ "%" ],
                locations: isIE ? [ 2, 0 ] : isGecko ? [ 1, 0 ] : [ 1, 0, 3 ]
            },
            "^": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 54 ],
                characters: [ "^" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "&": {
                pattern: isIE ? 3 : isGecko ? 3 : 4,
                keyCodes: [ 16, 55 ],
                characters: [ "&" ],
                locations: isIE ? [ 2, 0 ] : isGecko ? [ 1, 0 ] : [ 1, 0, 3 ]
            },
            "(": {
                pattern: isIE ? 3 : isGecko ? 3 : 4,
                keyCodes: [ 16, 57 ],
                characters: [ "(" ],
                locations: isIE ? [ 2, 0 ] : isGecko ? [ 1, 0 ] : [ 1, 0, 3 ]
            },
            A: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 65 ],
                characters: [ "A" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            B: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 66 ],
                characters: [ "B" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            C: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 67 ],
                characters: [ "C" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            D: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 68 ],
                characters: [ "D" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            E: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 69 ],
                characters: [ "E" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            F: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 70 ],
                characters: [ "F" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            G: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 71 ],
                characters: [ "G" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            H: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 72 ],
                characters: [ "H" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            I: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 73 ],
                characters: [ "I" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            J: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 74 ],
                characters: [ "J" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            K: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 75 ],
                characters: [ "K" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            L: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 76 ],
                characters: [ "L" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            M: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 77 ],
                characters: [ "M" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            N: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 78 ],
                characters: [ "N" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            O: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 79 ],
                characters: [ "O" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            P: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 80 ],
                characters: [ "P" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            Q: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 81 ],
                characters: [ "Q" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            R: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 82 ],
                characters: [ "R" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            S: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 83 ],
                characters: [ "S" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            T: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 84 ],
                characters: [ "T" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            U: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 85 ],
                characters: [ "U" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            V: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 86 ],
                characters: [ "V" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            W: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 87 ],
                characters: [ "W" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            X: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 88 ],
                characters: [ "X" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            Y: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 89 ],
                characters: [ "Y" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            Z: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 90 ],
                characters: [ "Z" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            ":": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: isGecko ? [ 16, 59 ] : [ 16, 186 ],
                characters: [ ":" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "<": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 188 ],
                characters: [ "<" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            _: {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: isGecko ? [ 16, 173 ] : [ 16, 189 ],
                characters: [ "_" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            ">": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 190 ],
                characters: [ ">" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "?": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 191 ],
                characters: [ "?" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "~": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 192 ],
                characters: [ "~" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "{": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 219 ],
                characters: [ "{" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "|": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 220 ],
                characters: [ "|" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            "}": {
                pattern: isIE ? 3 : isGecko ? 3 : 2,
                keyCodes: [ 16, 221 ],
                characters: [ "}" ],
                locations: isIE ? [ 2, 0 ] : [ 1, 0 ]
            },
            '"': {
                pattern: isIE ? 3 : isGecko ? 3 : 4,
                keyCodes: [ 16, 222 ],
                characters: [ '"' ],
                locations: isIE ? [ 2, 0 ] : isGecko ? [ 1, 0 ] : [ 1, 0, 3 ]
            }
        }
    };
    Stimuli.core.Object.merge(Stimuli.keyboard.layout.windows.us, Stimuli.keyboard.layout.Generic);
})();