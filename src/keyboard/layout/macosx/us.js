"use strict";

(function() {
    var isGecko = Stimuli.core.Support.isGecko;
    var isIE = Stimuli.core.Support.isIE;
    Stimuli.keyboard.layout.macosx.us = {
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
                altKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1],
                altKey: true
            }, {
                type: "keypress",
                location: locations[1],
                altKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[1],
                altKey: true
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
                location: locations[0],
                keyCode: keyCodes[1],
                altKey: true,
                shiftKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[2],
                altKey: true,
                shiftKey: true
            }, {
                type: "keypress",
                location: locations[1],
                altKey: true,
                shiftKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[2],
                altKey: true,
                shiftKey: true
            }, {
                type: "keyup",
                location: locations[0],
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
                altKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1],
                altKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[2],
                altKey: true
            }, {
                type: "keyup",
                location: locations[0],
                keyCode: keyCodes[0]
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1]
            }, {
                type: "input",
                character: characters[1]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[2]
            } ];
        }, function(keyCodes, characters, locations) {
            return [ {
                type: "keydown",
                location: locations[0],
                keyCode: keyCodes[0],
                altKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1],
                altKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "input",
                character: characters[1]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[1]
            } ];
        }, function(keyCodes, characters, locations) {
            return [ {
                type: "keydown",
                location: locations[0],
                keyCode: keyCodes[0],
                altKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1],
                altKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[2],
                altKey: true
            }, {
                type: "keyup",
                location: locations[0],
                keyCode: keyCodes[0]
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1]
            }, {
                type: "input",
                character: characters[1]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[3]
            } ];
        }, function(keyCodes, characters, locations) {
            return [ {
                type: "keydown",
                location: locations[0],
                keyCode: keyCodes[0],
                altKey: true
            }, {
                type: "keydown",
                location: locations[1],
                keyCode: keyCodes[1],
                altKey: true
            }, {
                type: "input",
                character: characters[0]
            }, {
                type: "input",
                character: characters[1]
            }, {
                type: "keyup",
                location: locations[1],
                keyCode: keyCodes[2]
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
            "\\": {
                pattern: 0,
                keyCodes: [ 220 ],
                characters: [ "\\" ],
                locations: [ 0 ]
            },
            ",": {
                pattern: 0,
                keyCodes: [ 188 ],
                characters: [ "," ],
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
            "-": {
                pattern: 0,
                keyCodes: isGecko ? [ 173 ] : [ 189 ],
                characters: [ "-" ],
                locations: [ 0 ]
            },
            "[": {
                pattern: 0,
                keyCodes: [ 219 ],
                characters: [ "[" ],
                locations: [ 0 ]
            },
            ".": {
                pattern: 0,
                keyCodes: [ 190 ],
                characters: [ "." ],
                locations: [ 0 ]
            },
            "'": {
                pattern: 0,
                keyCodes: [ 222 ],
                characters: [ "'" ],
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
                pattern: 0,
                keyCodes: [ 106 ],
                characters: [ "*" ],
                locations: [ 3 ]
            },
            "+": {
                pattern: 0,
                keyCodes: [ 107 ],
                characters: [ "+" ],
                locations: [ 3 ]
            },
            ")": {
                pattern: 1,
                keyCodes: [ 16, 48 ],
                characters: [ ")" ],
                locations: [ 1, 0 ]
            },
            "!": {
                pattern: 1,
                keyCodes: [ 16, 49 ],
                characters: [ "!" ],
                locations: [ 1, 0 ]
            },
            "@": {
                pattern: 1,
                keyCodes: [ 16, 50 ],
                characters: [ "@" ],
                locations: [ 1, 0 ]
            },
            "#": {
                pattern: 1,
                keyCodes: [ 16, 51 ],
                characters: [ "#" ],
                locations: [ 1, 0 ]
            },
            $: {
                pattern: 1,
                keyCodes: [ 16, 52 ],
                characters: [ "$" ],
                locations: [ 1, 0 ]
            },
            "%": {
                pattern: 1,
                keyCodes: [ 16, 53 ],
                characters: [ "%" ],
                locations: [ 1, 0 ]
            },
            "^": {
                pattern: 1,
                keyCodes: [ 16, 54 ],
                characters: [ "^" ],
                locations: [ 1, 0 ]
            },
            "&": {
                pattern: 1,
                keyCodes: [ 16, 55 ],
                characters: [ "&" ],
                locations: [ 1, 0 ]
            },
            "(": {
                pattern: 1,
                keyCodes: [ 16, 57 ],
                characters: [ "(" ],
                locations: [ 1, 0 ]
            },
            A: {
                pattern: 1,
                keyCodes: [ 16, 65 ],
                characters: [ "A" ],
                locations: [ 1, 0 ]
            },
            B: {
                pattern: 1,
                keyCodes: [ 16, 66 ],
                characters: [ "B" ],
                locations: [ 1, 0 ]
            },
            C: {
                pattern: 1,
                keyCodes: [ 16, 67 ],
                characters: [ "C" ],
                locations: [ 1, 0 ]
            },
            D: {
                pattern: 1,
                keyCodes: [ 16, 68 ],
                characters: [ "D" ],
                locations: [ 1, 0 ]
            },
            E: {
                pattern: 1,
                keyCodes: [ 16, 69 ],
                characters: [ "E" ],
                locations: [ 1, 0 ]
            },
            F: {
                pattern: 1,
                keyCodes: [ 16, 70 ],
                characters: [ "F" ],
                locations: [ 1, 0 ]
            },
            G: {
                pattern: 1,
                keyCodes: [ 16, 71 ],
                characters: [ "G" ],
                locations: [ 1, 0 ]
            },
            H: {
                pattern: 1,
                keyCodes: [ 16, 72 ],
                characters: [ "H" ],
                locations: [ 1, 0 ]
            },
            I: {
                pattern: 1,
                keyCodes: [ 16, 73 ],
                characters: [ "I" ],
                locations: [ 1, 0 ]
            },
            J: {
                pattern: 1,
                keyCodes: [ 16, 74 ],
                characters: [ "J" ],
                locations: [ 1, 0 ]
            },
            K: {
                pattern: 1,
                keyCodes: [ 16, 75 ],
                characters: [ "K" ],
                locations: [ 1, 0 ]
            },
            L: {
                pattern: 1,
                keyCodes: [ 16, 76 ],
                characters: [ "L" ],
                locations: [ 1, 0 ]
            },
            M: {
                pattern: 1,
                keyCodes: [ 16, 77 ],
                characters: [ "M" ],
                locations: [ 1, 0 ]
            },
            N: {
                pattern: 1,
                keyCodes: [ 16, 78 ],
                characters: [ "N" ],
                locations: [ 1, 0 ]
            },
            O: {
                pattern: 1,
                keyCodes: [ 16, 79 ],
                characters: [ "O" ],
                locations: [ 1, 0 ]
            },
            P: {
                pattern: 1,
                keyCodes: [ 16, 80 ],
                characters: [ "P" ],
                locations: [ 1, 0 ]
            },
            Q: {
                pattern: 1,
                keyCodes: [ 16, 81 ],
                characters: [ "Q" ],
                locations: [ 1, 0 ]
            },
            R: {
                pattern: 1,
                keyCodes: [ 16, 82 ],
                characters: [ "R" ],
                locations: [ 1, 0 ]
            },
            S: {
                pattern: 1,
                keyCodes: [ 16, 83 ],
                characters: [ "S" ],
                locations: [ 1, 0 ]
            },
            T: {
                pattern: 1,
                keyCodes: [ 16, 84 ],
                characters: [ "T" ],
                locations: [ 1, 0 ]
            },
            U: {
                pattern: 1,
                keyCodes: [ 16, 85 ],
                characters: [ "U" ],
                locations: [ 1, 0 ]
            },
            V: {
                pattern: 1,
                keyCodes: [ 16, 86 ],
                characters: [ "V" ],
                locations: [ 1, 0 ]
            },
            W: {
                pattern: 1,
                keyCodes: [ 16, 87 ],
                characters: [ "W" ],
                locations: [ 1, 0 ]
            },
            X: {
                pattern: 1,
                keyCodes: [ 16, 88 ],
                characters: [ "X" ],
                locations: [ 1, 0 ]
            },
            Y: {
                pattern: 1,
                keyCodes: [ 16, 89 ],
                characters: [ "Y" ],
                locations: [ 1, 0 ]
            },
            Z: {
                pattern: 1,
                keyCodes: [ 16, 90 ],
                characters: [ "Z" ],
                locations: [ 1, 0 ]
            },
            "|": {
                pattern: 1,
                keyCodes: [ 16, 220 ],
                characters: [ "|" ],
                locations: [ 1, 0 ]
            },
            "<": {
                pattern: 1,
                keyCodes: [ 16, 188 ],
                characters: [ "<" ],
                locations: [ 1, 0 ]
            },
            "~": {
                pattern: 1,
                keyCodes: [ 16, 192 ],
                characters: [ "~" ],
                locations: [ 1, 0 ]
            },
            _: {
                pattern: 1,
                keyCodes: isGecko ? [ 16, 173 ] : [ 16, 189 ],
                characters: [ "_" ],
                locations: [ 1, 0 ]
            },
            "{": {
                pattern: 1,
                keyCodes: [ 16, 219 ],
                characters: [ "{" ],
                locations: [ 1, 0 ]
            },
            ">": {
                pattern: 1,
                keyCodes: [ 16, 190 ],
                characters: [ ">" ],
                locations: [ 1, 0 ]
            },
            '"': {
                pattern: 1,
                keyCodes: [ 16, 222 ],
                characters: [ '"' ],
                locations: [ 1, 0 ]
            },
            "}": {
                pattern: 1,
                keyCodes: [ 16, 221 ],
                characters: [ "}" ],
                locations: [ 1, 0 ]
            },
            ":": {
                pattern: 1,
                keyCodes: isGecko ? [ 16, 59 ] : [ 16, 186 ],
                characters: [ ":" ],
                locations: [ 1, 0 ]
            },
            "?": {
                pattern: 1,
                keyCodes: [ 16, 191 ],
                characters: [ "?" ],
                locations: [ 1, 0 ]
            },
            º: {
                pattern: 2,
                keyCodes: [ 18, 48 ],
                characters: [ "º" ],
                locations: [ 1, 0 ]
            },
            "¡": {
                pattern: 2,
                keyCodes: [ 18, 49 ],
                characters: [ "¡" ],
                locations: [ 1, 0 ]
            },
            "™": {
                pattern: 2,
                keyCodes: [ 18, 50 ],
                characters: [ "™" ],
                locations: [ 1, 0 ]
            },
            "£": {
                pattern: 2,
                keyCodes: [ 18, 51 ],
                characters: [ "£" ],
                locations: [ 1, 0 ]
            },
            "¢": {
                pattern: 2,
                keyCodes: [ 18, 52 ],
                characters: [ "¢" ],
                locations: [ 1, 0 ]
            },
            "∞": {
                pattern: 2,
                keyCodes: [ 18, 53 ],
                characters: [ "∞" ],
                locations: [ 1, 0 ]
            },
            "§": {
                pattern: 2,
                keyCodes: [ 18, 54 ],
                characters: [ "§" ],
                locations: [ 1, 0 ]
            },
            "¶": {
                pattern: 2,
                keyCodes: [ 18, 55 ],
                characters: [ "¶" ],
                locations: [ 1, 0 ]
            },
            "•": {
                pattern: 2,
                keyCodes: [ 18, 56 ],
                characters: [ "•" ],
                locations: [ 1, 0 ]
            },
            ª: {
                pattern: 2,
                keyCodes: [ 18, 57 ],
                characters: [ "ª" ],
                locations: [ 1, 0 ]
            },
            å: {
                pattern: 2,
                keyCodes: [ 18, 65 ],
                characters: [ "å" ],
                locations: [ 1, 0 ]
            },
            "∫": {
                pattern: 2,
                keyCodes: [ 18, 66 ],
                characters: [ "∫" ],
                locations: [ 1, 0 ]
            },
            ç: {
                pattern: 2,
                keyCodes: [ 18, 67 ],
                characters: [ "ç" ],
                locations: [ 1, 0 ]
            },
            "∂": {
                pattern: 2,
                keyCodes: [ 18, 68 ],
                characters: [ "∂" ],
                locations: [ 1, 0 ]
            },
            ƒ: {
                pattern: 2,
                keyCodes: [ 18, 70 ],
                characters: [ "ƒ" ],
                locations: [ 1, 0 ]
            },
            "©": {
                pattern: 2,
                keyCodes: [ 18, 71 ],
                characters: [ "©" ],
                locations: [ 1, 0 ]
            },
            "˙": {
                pattern: 2,
                keyCodes: [ 18, 72 ],
                characters: [ "˙" ],
                locations: [ 1, 0 ]
            },
            "∆": {
                pattern: 2,
                keyCodes: [ 18, 74 ],
                characters: [ "∆" ],
                locations: [ 1, 0 ]
            },
            "˚": {
                pattern: 2,
                keyCodes: [ 18, 75 ],
                characters: [ "˚" ],
                locations: [ 1, 0 ]
            },
            "¬": {
                pattern: 2,
                keyCodes: [ 18, 76 ],
                characters: [ "¬" ],
                locations: [ 1, 0 ]
            },
            µ: {
                pattern: 2,
                keyCodes: [ 18, 77 ],
                characters: [ "µ" ],
                locations: [ 1, 0 ]
            },
            ø: {
                pattern: 2,
                keyCodes: [ 18, 79 ],
                characters: [ "ø" ],
                locations: [ 1, 0 ]
            },
            π: {
                pattern: 2,
                keyCodes: [ 18, 80 ],
                characters: [ "π" ],
                locations: [ 1, 0 ]
            },
            œ: {
                pattern: 2,
                keyCodes: [ 18, 81 ],
                characters: [ "œ" ],
                locations: [ 1, 0 ]
            },
            "®": {
                pattern: 2,
                keyCodes: [ 18, 82 ],
                characters: [ "®" ],
                locations: [ 1, 0 ]
            },
            ß: {
                pattern: 2,
                keyCodes: [ 18, 83 ],
                characters: [ "ß" ],
                locations: [ 1, 0 ]
            },
            "†": {
                pattern: 2,
                keyCodes: [ 18, 84 ],
                characters: [ "†" ],
                locations: [ 1, 0 ]
            },
            "√": {
                pattern: 2,
                keyCodes: [ 18, 86 ],
                characters: [ "√" ],
                locations: [ 1, 0 ]
            },
            "∑": {
                pattern: 2,
                keyCodes: [ 18, 87 ],
                characters: [ "∑" ],
                locations: [ 1, 0 ]
            },
            "≈": {
                pattern: 2,
                keyCodes: [ 18, 88 ],
                characters: [ "≈" ],
                locations: [ 1, 0 ]
            },
            "¥": {
                pattern: 2,
                keyCodes: [ 18, 89 ],
                characters: [ "¥" ],
                locations: [ 1, 0 ]
            },
            Ω: {
                pattern: 2,
                keyCodes: [ 18, 90 ],
                characters: [ "Ω" ],
                locations: [ 1, 0 ]
            },
            "«": {
                pattern: 2,
                keyCodes: [ 18, 220 ],
                characters: [ "«" ],
                locations: [ 1, 0 ]
            },
            "≤": {
                pattern: 2,
                keyCodes: [ 18, 188 ],
                characters: [ "≤" ],
                locations: [ 1, 0 ]
            },
            "≠": {
                pattern: 2,
                keyCodes: isGecko ? [ 18, 61 ] : [ 18, 187 ],
                characters: [ "≠" ],
                locations: [ 1, 0 ]
            },
            "–": {
                pattern: 2,
                keyCodes: isGecko ? [ 18, 173 ] : [ 18, 189 ],
                characters: [ "–" ],
                locations: [ 1, 0 ]
            },
            "“": {
                pattern: 2,
                keyCodes: [ 18, 219 ],
                characters: [ "“" ],
                locations: [ 1, 0 ]
            },
            "≥": {
                pattern: 2,
                keyCodes: [ 18, 190 ],
                characters: [ "≥" ],
                locations: [ 1, 0 ]
            },
            æ: {
                pattern: 2,
                keyCodes: [ 18, 222 ],
                characters: [ "æ" ],
                locations: [ 1, 0 ]
            },
            "‘": {
                pattern: 2,
                keyCodes: [ 18, 221 ],
                characters: [ "‘" ],
                locations: [ 1, 0 ]
            },
            "…": {
                pattern: 2,
                keyCodes: isGecko ? [ 18, 59 ] : [ 18, 186 ],
                characters: [ "…" ],
                locations: [ 1, 0 ]
            },
            "÷": {
                pattern: 2,
                keyCodes: [ 18, 191 ],
                characters: [ "÷" ],
                locations: [ 1, 0 ]
            },
            "‚": {
                pattern: 3,
                keyCodes: [ 16, 18, 48 ],
                characters: [ "‚" ],
                locations: [ 1, 0 ]
            },
            "⁄": {
                pattern: 3,
                keyCodes: [ 16, 18, 49 ],
                characters: [ "⁄" ],
                locations: [ 1, 0 ]
            },
            "€": {
                pattern: 3,
                keyCodes: [ 16, 18, 50 ],
                characters: [ "€" ],
                locations: [ 1, 0 ]
            },
            "‹": {
                pattern: 3,
                keyCodes: [ 16, 18, 51 ],
                characters: [ "‹" ],
                locations: [ 1, 0 ]
            },
            "›": {
                pattern: 3,
                keyCodes: [ 16, 18, 52 ],
                characters: [ "›" ],
                locations: [ 1, 0 ]
            },
            ﬁ: {
                pattern: 3,
                keyCodes: [ 16, 18, 53 ],
                characters: [ "ﬁ" ],
                locations: [ 1, 0 ]
            },
            ﬂ: {
                pattern: 3,
                keyCodes: [ 16, 18, 54 ],
                characters: [ "ﬂ" ],
                locations: [ 1, 0 ]
            },
            "‡": {
                pattern: 3,
                keyCodes: [ 16, 18, 55 ],
                characters: [ "‡" ],
                locations: [ 1, 0 ]
            },
            "°": {
                pattern: 3,
                keyCodes: [ 16, 18, 56 ],
                characters: [ "°" ],
                locations: [ 1, 0 ]
            },
            "·": {
                pattern: 3,
                keyCodes: [ 16, 18, 57 ],
                characters: [ "·" ],
                locations: [ 1, 0 ]
            },
            Å: {
                pattern: 3,
                keyCodes: [ 16, 18, 65 ],
                characters: [ "Å" ],
                locations: [ 1, 0 ]
            },
            ı: {
                pattern: 3,
                keyCodes: [ 16, 18, 66 ],
                characters: [ "ı" ],
                locations: [ 1, 0 ]
            },
            Ç: {
                pattern: 3,
                keyCodes: [ 16, 18, 67 ],
                characters: [ "Ç" ],
                locations: [ 1, 0 ]
            },
            Î: {
                pattern: 3,
                keyCodes: [ 16, 18, 68 ],
                characters: [ "Î" ],
                locations: [ 1, 0 ]
            },
            "´": {
                pattern: 3,
                keyCodes: [ 16, 18, 69 ],
                characters: [ "´" ],
                locations: [ 1, 0 ]
            },
            Ï: {
                pattern: 3,
                keyCodes: [ 16, 18, 70 ],
                characters: [ "Ï" ],
                locations: [ 1, 0 ]
            },
            "˝": {
                pattern: 3,
                keyCodes: [ 16, 18, 71 ],
                characters: [ "˝" ],
                locations: [ 1, 0 ]
            },
            Ó: {
                pattern: 3,
                keyCodes: [ 16, 18, 72 ],
                characters: [ "Ó" ],
                locations: [ 1, 0 ]
            },
            ˆ: {
                pattern: 3,
                keyCodes: [ 16, 18, 73 ],
                characters: [ "ˆ" ],
                locations: [ 1, 0 ]
            },
            Ô: {
                pattern: 3,
                keyCodes: [ 16, 18, 74 ],
                characters: [ "Ô" ],
                locations: [ 1, 0 ]
            },
            "": {
                pattern: 3,
                keyCodes: [ 16, 18, 75 ],
                characters: [ "" ],
                locations: [ 1, 0 ]
            },
            Ò: {
                pattern: 3,
                keyCodes: [ 16, 18, 76 ],
                characters: [ "Ò" ],
                locations: [ 1, 0 ]
            },
            Â: {
                pattern: 3,
                keyCodes: [ 16, 18, 77 ],
                characters: [ "Â" ],
                locations: [ 1, 0 ]
            },
            "˜": {
                pattern: 3,
                keyCodes: [ 16, 18, 78 ],
                characters: [ "˜" ],
                locations: [ 1, 0 ]
            },
            Ø: {
                pattern: 3,
                keyCodes: [ 16, 18, 79 ],
                characters: [ "Ø" ],
                locations: [ 1, 0 ]
            },
            "∏": {
                pattern: 3,
                keyCodes: [ 16, 18, 80 ],
                characters: [ "∏" ],
                locations: [ 1, 0 ]
            },
            Œ: {
                pattern: 3,
                keyCodes: [ 16, 18, 81 ],
                characters: [ "Œ" ],
                locations: [ 1, 0 ]
            },
            "‰": {
                pattern: 3,
                keyCodes: [ 16, 18, 82 ],
                characters: [ "‰" ],
                locations: [ 1, 0 ]
            },
            Í: {
                pattern: 3,
                keyCodes: [ 16, 18, 83 ],
                characters: [ "Í" ],
                locations: [ 1, 0 ]
            },
            ˇ: {
                pattern: 3,
                keyCodes: [ 16, 18, 84 ],
                characters: [ "ˇ" ],
                locations: [ 1, 0 ]
            },
            "¨": {
                pattern: 3,
                keyCodes: [ 16, 18, 85 ],
                characters: [ "¨" ],
                locations: [ 1, 0 ]
            },
            "◊": {
                pattern: 3,
                keyCodes: [ 16, 18, 86 ],
                characters: [ "◊" ],
                locations: [ 1, 0 ]
            },
            "„": {
                pattern: 3,
                keyCodes: [ 16, 18, 87 ],
                characters: [ "„" ],
                locations: [ 1, 0 ]
            },
            "˛": {
                pattern: 3,
                keyCodes: [ 16, 18, 88 ],
                characters: [ "˛" ],
                locations: [ 1, 0 ]
            },
            Á: {
                pattern: 3,
                keyCodes: [ 16, 18, 89 ],
                characters: [ "Á" ],
                locations: [ 1, 0 ]
            },
            "¸": {
                pattern: 3,
                keyCodes: [ 16, 18, 90 ],
                characters: [ "¸" ],
                locations: [ 1, 0 ]
            },
            "»": {
                pattern: 3,
                keyCodes: [ 16, 18, 220 ],
                characters: [ "»" ],
                locations: [ 1, 0 ]
            },
            "¯": {
                pattern: 3,
                keyCodes: [ 16, 18, 188 ],
                characters: [ "¯" ],
                locations: [ 1, 0 ]
            },
            "±": {
                pattern: 3,
                keyCodes: isGecko ? [ 16, 18, 61 ] : [ 16, 18, 187 ],
                characters: [ "±" ],
                locations: [ 1, 0 ]
            },
            "—": {
                pattern: 3,
                keyCodes: isGecko ? [ 16, 18, 173 ] : [ 16, 18, 189 ],
                characters: [ "—" ],
                locations: [ 1, 0 ]
            },
            "”": {
                pattern: 3,
                keyCodes: [ 16, 18, 219 ],
                characters: [ "”" ],
                locations: [ 1, 0 ]
            },
            "˘": {
                pattern: 3,
                keyCodes: [ 16, 18, 190 ],
                characters: [ "˘" ],
                locations: [ 1, 0 ]
            },
            Æ: {
                pattern: 3,
                keyCodes: [ 16, 18, 222 ],
                characters: [ "Æ" ],
                locations: [ 1, 0 ]
            },
            "’": {
                pattern: 3,
                keyCodes: [ 16, 18, 221 ],
                characters: [ "’" ],
                locations: [ 1, 0 ]
            },
            Ú: {
                pattern: 3,
                keyCodes: isGecko ? [ 16, 18, 59 ] : [ 16, 18, 186 ],
                characters: [ "Ú" ],
                locations: [ 1, 0 ]
            },
            "¿": {
                pattern: 3,
                keyCodes: [ 16, 18, 191 ],
                characters: [ "¿" ],
                locations: [ 1, 0 ]
            },
            é: {
                pattern: isGecko ? 5 : 4,
                keyCodes: isGecko ? [ 18, 69 ] : [ 18, 229, 69 ],
                characters: [ "´", "é" ],
                locations: [ 1, 0 ]
            },
            í: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 69, 73 ] : [ 18, 229, 69, 73 ],
                characters: [ "´", "í" ],
                locations: [ 1, 0 ]
            },
            ó: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 69, 79 ] : [ 18, 229, 69, 79 ],
                characters: [ "´", "ó" ],
                locations: [ 1, 0 ]
            },
            ú: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 69, 85 ] : [ 18, 229, 69, 85 ],
                characters: [ "´", "ú" ],
                locations: [ 1, 0 ]
            },
            ê: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 73, 69 ] : [ 18, 229, 73, 69 ],
                characters: [ "ˆ", "ê" ],
                locations: [ 1, 0 ]
            },
            î: {
                pattern: isGecko ? 5 : 4,
                keyCodes: isGecko ? [ 18, 73 ] : [ 18, 229, 73 ],
                characters: [ "ˆ", "î" ],
                locations: [ 1, 0 ]
            },
            ô: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 73, 79 ] : [ 18, 229, 73, 79 ],
                characters: [ "ˆ", "ô" ],
                locations: [ 1, 0 ]
            },
            û: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 73, 85 ] : [ 18, 229, 73, 85 ],
                characters: [ "ˆ", "û" ],
                locations: [ 1, 0 ]
            },
            ñ: {
                pattern: isGecko ? 5 : 4,
                keyCodes: isGecko ? [ 18, 78 ] : [ 18, 229, 78 ],
                characters: [ "˜", "ñ" ],
                locations: [ 1, 0 ]
            },
            õ: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 78, 79 ] : [ 18, 229, 78, 79 ],
                characters: [ "˜", "õ" ],
                locations: [ 1, 0 ]
            },
            ë: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 85, 69 ] : [ 18, 229, 85, 69 ],
                characters: [ "¨", "ë" ],
                locations: [ 1, 0 ]
            },
            ï: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 85, 73 ] : [ 18, 229, 85, 73 ],
                characters: [ "¨", "ï" ],
                locations: [ 1, 0 ]
            },
            ö: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 85, 79 ] : [ 18, 229, 85, 79 ],
                characters: [ "¨", "ö" ],
                locations: [ 1, 0 ]
            },
            ü: {
                pattern: isGecko ? 5 : 4,
                keyCodes: isGecko ? [ 18, 85 ] : [ 18, 229, 85 ],
                characters: [ "¨", "ü" ],
                locations: [ 1, 0 ]
            },
            ÿ: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 85, 89 ] : [ 18, 229, 85, 89 ],
                characters: [ "¨", "ÿ" ],
                locations: [ 1, 0 ]
            },
            è: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 192, 69 ] : [ 18, 229, 192, 69 ],
                characters: [ "`", "è" ],
                locations: [ 1, 0 ]
            },
            ì: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 192, 73 ] : [ 18, 229, 192, 73 ],
                characters: [ "`", "ì" ],
                locations: [ 1, 0 ]
            },
            ò: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 192, 79 ] : [ 18, 229, 192, 79 ],
                characters: [ "`", "ò" ],
                locations: [ 1, 0 ]
            },
            ù: {
                pattern: isGecko ? 7 : 6,
                keyCodes: isGecko ? [ 18, 192, 85 ] : [ 18, 229, 192, 85 ],
                characters: [ "`", "ù" ],
                locations: [ 1, 0 ]
            }
        }
    };
    Stimuli.core.Object.merge(Stimuli.keyboard.layout.macosx.us, Stimuli.keyboard.layout.Generic);
})();