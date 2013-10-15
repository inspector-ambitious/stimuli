'use strict';
var generator = require(__dirname + '/build/Release/generator.node');

var platform = process.platform // darwin, linux, win32

module.exports = function (config) {
    config = config || {};

    var count = 0;
    var modifiers = [];
    var deadkeys = config.deadkeys || false;
    var shift;
    var options;
    var altgr;

    if (platform === 'darwin') {
        shift = 0x38;  // kVK_Shift
        options = 0x3A; // kVK_Option
    }

    if (platform === 'linux') {
        altgr = 100; // KEY_RIGHTALT
        shift = 42; // KEY_LEFTSHIFT
    }

    if (platform === 'win32') {
        altgr = 666; // see windows/generator.cc implementation (alt gr sends 2 keys on windows...)
        shift = 0xA0; // VK_LSHIFT
    }

    count = generator.sendKeys(deadkeys);

    if (config.shift) {
        modifiers.push(shift);
    }

    if (config.options && options) {
        modifiers.push(options);
    }

    if (config.altgr && altgr) {
        modifiers.push(altgr);
    }

    var args;
    var combos = {};

    // No modifiers
    count += generator.sendKeys.apply(generator, [deadkeys]);

    // only one modifier
    for (var i = 0; i < modifiers.length; i++) {
        args = [deadkeys];
        args.push(modifiers[i]);

        count += generator.sendKeys.apply(generator, args);
    }

    // modifiers combinations like alt + shift
    for (var i = 0; i < modifiers.length; i++) {
        for (var j = 0; j < modifiers.length; j++) {
            if (i !== j && !combos[i + ' ' + j] && !combos[j + ' ' + i]) {
                combos[i + ' ' + j] = true;
                args = [deadkeys];
                args.push(modifiers[i]);
                args.push(modifiers[j]);
                count += generator.sendKeys.apply(generator, args);
            }
        }
    }

    return count;
};