"use strict";

(function() {
    var isGecko = Stimuli.core.Support.isGecko;
    var isIE = Stimuli.core.Support.isIE;
    Stimuli.keyboard.layout.linux.us = {
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
                location: locations[0],
                keyCode: keyCodes[0],
                shiftKey: true
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
                pattern: 0,
                keyCodes: [ 65 ],
                characters: [ "a" ],
                locations: [ 0 ]
            },
            b: {
                pattern: 0,
                keyCodes: [ 66 ],
                characters: [ "b" ],
                locations: [ 0 ]
            },
            c: {
                pattern: 0,
                keyCodes: [ 67 ],
                characters: [ "c" ],
                locations: [ 0 ]
            },
            d: {
                pattern: 0,
                keyCodes: [ 68 ],
                characters: [ "d" ],
                locations: [ 0 ]
            },
            e: {
                pattern: 0,
                keyCodes: [ 69 ],
                characters: [ "e" ],
                locations: [ 0 ]
            },
            f: {
                pattern: 0,
                keyCodes: [ 70 ],
                characters: [ "f" ],
                locations: [ 0 ]
            },
            g: {
                pattern: 0,
                keyCodes: [ 71 ],
                characters: [ "g" ],
                locations: [ 0 ]
            },
            h: {
                pattern: 0,
                keyCodes: [ 72 ],
                characters: [ "h" ],
                locations: [ 0 ]
            },
            i: {
                pattern: 0,
                keyCodes: [ 73 ],
                characters: [ "i" ],
                locations: [ 0 ]
            },
            j: {
                pattern: 0,
                keyCodes: [ 74 ],
                characters: [ "j" ],
                locations: [ 0 ]
            },
            k: {
                pattern: 0,
                keyCodes: [ 75 ],
                characters: [ "k" ],
                locations: [ 0 ]
            },
            l: {
                pattern: 0,
                keyCodes: [ 76 ],
                characters: [ "l" ],
                locations: [ 0 ]
            },
            m: {
                pattern: 0,
                keyCodes: [ 77 ],
                characters: [ "m" ],
                locations: [ 0 ]
            },
            n: {
                pattern: 0,
                keyCodes: [ 78 ],
                characters: [ "n" ],
                locations: [ 0 ]
            },
            o: {
                pattern: 0,
                keyCodes: [ 79 ],
                characters: [ "o" ],
                locations: [ 0 ]
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
            "'": {
                pattern: 0,
                keyCodes: [ 222 ],
                characters: [ "'" ],
                locations: [ 0 ]
            },
            "\\": {
                pattern: isGecko ? 0 : 1,
                keyCodes: [ 220 ],
                characters: [ "\\" ],
                locations: isGecko ? [ 0 ] : [ 0, 2 ]
            },
            ",": {
                pattern: 0,
                keyCodes: [ 188 ],
                characters: [ "," ],
                locations: [ 0 ]
            },
            ".": {
                pattern: 0,
                keyCodes: [ 190 ],
                characters: [ "." ],
                locations: [ 0 ]
            },
            "=": {
                pattern: 0,
                keyCodes: isGecko ? [ 61 ] : [ 187 ],
                characters: [ "=" ],
                locations: [ 0 ]
            },
            "`": {
                pattern: 0,
                keyCodes: [ 192 ],
                characters: [ "`" ],
                locations: [ 0 ]
            },
            "[": {
                pattern: isGecko ? 0 : 1,
                keyCodes: [ 219 ],
                characters: [ "[" ],
                locations: isGecko ? [ 0 ] : [ 0, 1 ]
            },
            "-": {
                pattern: 0,
                keyCodes: isGecko ? [ 173 ] : [ 189 ],
                characters: [ "-" ],
                locations: [ 0 ]
            },
            "]": {
                pattern: 0,
                keyCodes: [ 221 ],
                characters: [ "]" ],
                locations: [ 0 ]
            },
            ";": {
                pattern: 0,
                keyCodes: isGecko ? [ 59 ] : [ 186 ],
                characters: [ ";" ],
                locations: [ 0 ]
            },
            "/": {
                pattern: 0,
                keyCodes: [ 191 ],
                characters: [ "/" ],
                locations: [ 0 ]
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
            "±": {
                pattern: 0,
                keyCodes: [ 0 ],
                characters: [ "±" ],
                locations: [ 0 ]
            },
            ")": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 48 ],
                characters: [ ")" ],
                locations: [ 2, 0 ]
            },
            "!": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 49 ],
                characters: [ "!" ],
                locations: [ 2, 0 ]
            },
            "@": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 50 ],
                characters: [ "@" ],
                locations: [ 2, 0 ]
            },
            "#": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 51 ],
                characters: [ "#" ],
                locations: [ 2, 0 ]
            },
            $: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 52 ],
                characters: [ "$" ],
                locations: [ 2, 0 ]
            },
            "%": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 53 ],
                characters: [ "%" ],
                locations: [ 2, 0 ]
            },
            "^": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 54 ],
                characters: [ "^" ],
                locations: [ 2, 0 ]
            },
            "&": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 55 ],
                characters: [ "&" ],
                locations: [ 2, 0 ]
            },
            "(": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 57 ],
                characters: [ "(" ],
                locations: [ 2, 0 ]
            },
            A: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 65 ],
                characters: [ "A" ],
                locations: [ 2, 0 ]
            },
            B: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 66 ],
                characters: [ "B" ],
                locations: [ 2, 0 ]
            },
            C: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 67 ],
                characters: [ "C" ],
                locations: [ 2, 0 ]
            },
            D: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 68 ],
                characters: [ "D" ],
                locations: [ 2, 0 ]
            },
            E: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 69 ],
                characters: [ "E" ],
                locations: [ 2, 0 ]
            },
            F: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 70 ],
                characters: [ "F" ],
                locations: [ 2, 0 ]
            },
            G: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 71 ],
                characters: [ "G" ],
                locations: [ 2, 0 ]
            },
            H: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 72 ],
                characters: [ "H" ],
                locations: [ 2, 0 ]
            },
            I: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 73 ],
                characters: [ "I" ],
                locations: [ 2, 0 ]
            },
            J: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 74 ],
                characters: [ "J" ],
                locations: [ 2, 0 ]
            },
            K: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 75 ],
                characters: [ "K" ],
                locations: [ 2, 0 ]
            },
            L: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 76 ],
                characters: [ "L" ],
                locations: [ 2, 0 ]
            },
            M: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 77 ],
                characters: [ "M" ],
                locations: [ 2, 0 ]
            },
            N: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 78 ],
                characters: [ "N" ],
                locations: [ 2, 0 ]
            },
            O: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 79 ],
                characters: [ "O" ],
                locations: [ 2, 0 ]
            },
            P: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 80 ],
                characters: [ "P" ],
                locations: [ 2, 0 ]
            },
            Q: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 81 ],
                characters: [ "Q" ],
                locations: [ 2, 0 ]
            },
            R: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 82 ],
                characters: [ "R" ],
                locations: [ 2, 0 ]
            },
            S: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 83 ],
                characters: [ "S" ],
                locations: [ 2, 0 ]
            },
            T: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 84 ],
                characters: [ "T" ],
                locations: [ 2, 0 ]
            },
            U: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 85 ],
                characters: [ "U" ],
                locations: [ 2, 0 ]
            },
            V: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 86 ],
                characters: [ "V" ],
                locations: [ 2, 0 ]
            },
            W: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 87 ],
                characters: [ "W" ],
                locations: [ 2, 0 ]
            },
            X: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 88 ],
                characters: [ "X" ],
                locations: [ 2, 0 ]
            },
            Y: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 89 ],
                characters: [ "Y" ],
                locations: [ 2, 0 ]
            },
            Z: {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 90 ],
                characters: [ "Z" ],
                locations: [ 2, 0 ]
            },
            '"': {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 222 ],
                characters: [ '"' ],
                locations: [ 2, 0 ]
            },
            "|": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 220 ],
                characters: [ "|" ],
                locations: [ 2, 0 ]
            },
            "<": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 188 ],
                characters: [ "<" ],
                locations: [ 2, 0 ]
            },
            ">": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 190 ],
                characters: [ ">" ],
                locations: [ 2, 0 ]
            },
            "~": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 192 ],
                characters: [ "~" ],
                locations: [ 2, 0 ]
            },
            "{": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 219 ],
                characters: [ "{" ],
                locations: [ 2, 0 ]
            },
            _: {
                pattern: isGecko ? 3 : 2,
                keyCodes: isGecko ? [ 16, 173 ] : [ 16, 189 ],
                characters: [ "_" ],
                locations: [ 2, 0 ]
            },
            "}": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 221 ],
                characters: [ "}" ],
                locations: [ 2, 0 ]
            },
            ":": {
                pattern: isGecko ? 3 : 2,
                keyCodes: isGecko ? [ 16, 59 ] : [ 16, 186 ],
                characters: [ ":" ],
                locations: [ 2, 0 ]
            },
            "?": {
                pattern: isGecko ? 3 : 2,
                keyCodes: [ 16, 191 ],
                characters: [ "?" ],
                locations: [ 2, 0 ]
            }
        }
    };
    Stimuli.core.Object.merge(Stimuli.keyboard.layout.linux.us, Stimuli.keyboard.layout.Generic);
})();