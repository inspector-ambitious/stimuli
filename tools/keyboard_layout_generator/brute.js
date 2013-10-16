'use strict';
var generator = require(__dirname + '/build/Release/generator.node');

var platform = process.platform;

module.exports = function (config) {
    config = config || {};

    var count = 0;
    var keys;
    var numLock;

    if (platform === 'darwin') {
        keys = {
            kVK_ANSI_0: 0x1D,
            kVK_ANSI_1: 0x12,
            kVK_ANSI_2: 0x13,
            kVK_ANSI_3: 0x14,
            kVK_ANSI_4: 0x15,
            kVK_ANSI_5: 0x17,
            kVK_ANSI_6: 0x16,
            kVK_ANSI_7: 0x1A,
            kVK_ANSI_8: 0x1C,
            kVK_ANSI_9: 0x19,
            kVK_ANSI_A: 0x00,
            kVK_ANSI_B: 0x0B,
            kVK_ANSI_C: 0x08,
            kVK_ANSI_D: 0x02,
            kVK_ANSI_E: 0x0E,
            kVK_ANSI_F: 0x03,
            kVK_ANSI_G: 0x05,
            kVK_ANSI_H: 0x04,
            kVK_ANSI_I: 0x22,
            kVK_ANSI_J: 0x26,
            kVK_ANSI_K: 0x28,
            kVK_ANSI_L: 0x25,
            kVK_ANSI_M: 0x2E,
            kVK_ANSI_N: 0x2D,
            kVK_ANSI_O: 0x1F,
            kVK_ANSI_P: 0x23,
            kVK_ANSI_Q: 0x0C,
            kVK_ANSI_R: 0x0F,
            kVK_ANSI_S: 0x01,
            kVK_ANSI_T: 0x11,
            kVK_ANSI_U: 0x20,
            kVK_ANSI_V: 0x09,
            kVK_ANSI_W: 0x0D,
            kVK_ANSI_X: 0x07,
            kVK_ANSI_Y: 0x10,
            kVK_ANSI_Z: 0x06,
            kVK_ANSI_Backslash: 0x2A,
            kVK_ANSI_Comma: 0x2B,
            kVK_ANSI_Equal: 0x18,
            kVK_ANSI_Grave: 0x32,
            kVK_ANSI_Minus: 0x1B,
            kVK_ANSI_LeftBracket: 0x21,
            kVK_ANSI_Period: 0x2F,
            kVK_ANSI_Quote: 0x27,
            kVK_ANSI_RightBracket: 0x1E,
            kVK_ANSI_Semicolon: 0x29,
            kVK_ANSI_Slash: 0x2C,
            kVK_ANSI_Keypad0: 0x52,
            kVK_ANSI_Keypad1: 0x53,
            kVK_ANSI_Keypad2: 0x54,
            kVK_ANSI_Keypad3: 0x55,
            kVK_ANSI_Keypad4: 0x56,
            kVK_ANSI_Keypad5: 0x57,
            kVK_ANSI_Keypad6: 0x58,
            kVK_ANSI_Keypad7: 0x59,
            kVK_ANSI_Keypad8: 0x5B,
            kVK_ANSI_Keypad9: 0x5C,
            kVK_ANSI_KeypadClear: 0x47,
            kVK_ANSI_KeypadDecimal: 0x41,
            kVK_ANSI_KeypadDivide: 0x4B,
            kVK_ANSI_KeypadEquals: 0x51,
            kVK_ANSI_KeypadMinus: 0x4E,
            kVK_ANSI_KeypadMultiply: 0x43,
            kVK_ANSI_KeypadPlus: 0x45,
        };
        numLock = function(keyName) {
            /^kVK_ANSI_Keypad/.test(keyName);
        };
    }

    if (platform === 'linux') {
		keys = {
			KEY_0: 11,
			KEY_1: 2,
			KEY_2: 3,
			KEY_3: 4,
			KEY_4: 5,
			KEY_5: 6,
			KEY_6: 7,
			KEY_7: 8,
			KEY_8: 9,
			KEY_9: 10,
			KEY_A: 30,
			KEY_B: 48,
			KEY_C: 46,
			KEY_D: 32,
			KEY_E: 18,
			KEY_F: 33,
			KEY_G: 34,
			KEY_H: 35,
			KEY_I: 23,
			KEY_J: 36,
			KEY_K: 37,
			KEY_L: 38,
			KEY_M: 50,
			KEY_N: 49,
			KEY_O: 24,
			KEY_P: 25,
			KEY_Q: 16,
			KEY_R: 19,
			KEY_S: 31,
			KEY_T: 20,
			KEY_U: 22,
			KEY_V: 47,
			KEY_W: 17,
			KEY_X: 45,
			KEY_Y: 21,
			KEY_Z: 44,
			KEY_APOSTROPHE: 40,
			KEY_BACKSLASH: 43,
			KEY_COMMA: 51,
			KEY_DOT: 52,
			KEY_EQUAL: 13,
			KEY_GRAVE: 41,
			KEY_LEFTBRACE: 26,
			KEY_MINUS: 12,
			KEY_RIGHTBRACE: 27,
			KEY_SEMICOLON: 39,
			KEY_SLASH: 53,
			KEY_KP0: 82,
			KEY_KP1: 79,
			KEY_KP2: 80,
			KEY_KP3: 81,
			KEY_KP4: 75,
			KEY_KP5: 76,
			KEY_KP6: 77,
			KEY_KP7: 71,
			KEY_KP8: 72,
			KEY_KP9: 73,
			KEY_KPASTERISK: 55,
			KEY_KPCOMMA: 121,
			KEY_KPDOT: 83,
			KEY_KPEQUAL: 117,
			KEY_KPMINUS: 74,
			KEY_KPPLUS: 78,
			KEY_KPPLUSMINUS: 118
		};
		
		numLock = function(keyName) {
            /^KEY_KP/.test(keyName);
        };
		
    }

    if (platform === 'win32') {

    }



    var args;
    var combos = {};
    var key1, key2, name1, name2;
    var secondKey = null;

    for (name1 in keys) {
        if (keys.hasOwnProperty(name1)) {
            generator.sendCombo({
                delay: config.delay || 0,
                key1: keys[name1],
                numLock: numLock(name1)
            });
            count++;
        }
    }

    if (config.shift) {

        for (name1 in keys) {
            if (keys.hasOwnProperty(name1)) {
                generator.sendCombo({
                    delay: config.delay || 0,
                    key1: keys[name1],
                    shift: true,
                    numLock: numLock(name1)
                });
                count++;
            }
        }

    }

    if (config.options) {

        for (name1 in keys) {
            if (keys.hasOwnProperty(name1)) {
                generator.sendCombo({
                    delay: config.delay || 0,
                    key1: keys[name1],
                    options: true,
                    numLock: numLock(name1)
                });
                count++;
            }
        }

        if (config.shift) {

            for (name1 in keys) {
                if (keys.hasOwnProperty(name1)) {
                    generator.sendCombo({
                        delay: config.delay || 0,
                        key1: keys[name1],
                        shift: true,
                        options: true,
                        numLock: numLock(name1)
                    });
                    count++;
                }
            }

        }
    }

    if (config.deadkeys) {

        for (name1 in keys) {
            if (keys.hasOwnProperty(name1)) {
                for (name2 in keys) {
                    if (keys.hasOwnProperty(name2)) {
                        generator.sendCombo({
                            delay: config.delay || 0,
                            key1: keys[name1],
                            key2: keys[name2],
                            numLock: numLock(name1) || numLock(name2)
                        });
                        count++;
                    }
                }
            }
        }

        if (config.shift) {
            for (name1 in keys) {
                if (keys.hasOwnProperty(name1)) {
                    for (name2 in keys) {
                        if (keys.hasOwnProperty(name2)) {
                            generator.sendCombo({
                                delay: config.delay || 0,
                                key1: keys[name1],
                                shift: true,
                                key2: keys[name2],
                                numLock: numLock(name1) || numLock(name2)
                            });
                            count++;
                        }
                    }
                }
            }
        }

        if (config.options) {
            for (name1 in keys) {
                if (keys.hasOwnProperty(name1)) {
                    for (name2 in keys) {
                        if (keys.hasOwnProperty(name2)) {
                            generator.sendCombo({
                                delay: config.delay || 0,
                                key1: keys[name1],
                                options: true,
                                key2: keys[name2],
                                numLock: numLock(name1) || numLock(name2)
                            });
                            count++;
                        }
                    }
                }
            }

            if (config.shift) {
                for (name1 in keys) {
                    if (keys.hasOwnProperty(name1)) {
                        for (name2 in keys) {
                            if (keys.hasOwnProperty(name2)) {
                                 generator.sendCombo({
                                    delay: config.delay || 0,
                                    key1: keys[name1],
                                    options: true,
                                    shift: true,
                                    key2: keys[name2],
                                    numLock: numLock(name1) || numLock(name2)
                                });
                                count++;
                            }
                        }
                    }
                }
            }
        }
    }

    return count;
};
