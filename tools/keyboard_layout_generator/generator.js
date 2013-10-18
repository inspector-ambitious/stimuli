'use strict';
var fs = require('fs');
var UglifyJS = require('uglify-js');

module.exports = {

    patterns: [],

    table: {},

    extractValues: function(sequence, value) {
        var values = [];

        sequence.forEach(function(eventConfig) {
            if (typeof eventConfig[value] !== 'undefined') {
                if (values.indexOf(eventConfig[value]) === -1) {
                    values.push(eventConfig[value]);
                }
            }
        });

        return values;
    },

    createPattern: function (sequence, keyCodes, characters, locations) {
        var eventConfigs = [];

        sequence.forEach(function(eventConfig) {
            var copy = {};
            for (var prop in eventConfig) {
                if (eventConfig.hasOwnProperty(prop)) {
                    if (prop === 'keyCode') {
                        copy[prop] = 'keyCodes[' + keyCodes.indexOf(eventConfig[prop]) + ']';

                    } else if (prop === 'character') {
                        copy[prop] = 'characters[' + characters.indexOf(eventConfig[prop]) + ']';

                    }  else if (prop === 'location') {
                        copy[prop] = 'locations[' + locations.indexOf(eventConfig[prop]) + ']';
                    } else {
                        copy[prop] = eventConfig[prop];
                    }
                }
            }

            eventConfigs.push(copy);

        });

        var retVal = JSON.stringify(eventConfigs).replace(/"(keyCodes\[\d+\]|characters\[\d+\]|locations\[\d+\])"/g, '$1');
        var fn = [
            '(function (keyCodes, characters, locations) {',
            'return ' + retVal + ';',
            '})'
        ];

        return eval(fn.join('\n'));
    },

    isEquivalent: function (sequence1, sequence2) {
        if (sequence1.length !== sequence2.length) {
            return false;
        }

        var eventConfig1;
        var eventConfig2;
        var prop;
        var i;

        for (i = 0; i < sequence1.length; i++) {
            eventConfig1 = sequence1[i];
            eventConfig2 = sequence2[i];

            for (prop in eventConfig1) {
                if (eventConfig1.hasOwnProperty(prop)) {
                    if (eventConfig1[prop] !== eventConfig2[prop]) {
                        return false;
                    }
                }
            }
        }

        return true;
     },

    updateTable: function (char, sequence, conditionName) {
        var table = this.table;
        var patterns = this.patterns;

        var keyCodes = this.extractValues(sequence, 'keyCode');
        var characters = this.extractValues(sequence, 'character');
        var locations = this.extractValues(sequence, 'location');

        var idx = null;

        for (var i = 0; i < patterns.length; i++) {
            if (this.isEquivalent(sequence, patterns[i](keyCodes, characters, locations))){
                idx = i;
                break;
            }
        }

        if (idx === null) {
            patterns.push(this.createPattern(sequence, keyCodes, characters, locations));
            idx = patterns.length - 1;
        }

        var tableEntry = {
            pattern: idx,
            keyCodes: keyCodes,
            characters: characters,
            locations: locations
        };

        if (!table[char]) {
            table[char] = tableEntry;
        } else {
            var previousTableEntry = table[char];
            var previousVal;
            var currentVal;
            var realVal;
            for (var prop in tableEntry) {
                if (tableEntry.hasOwnProperty(prop)) {
                    previousVal = JSON.stringify(previousTableEntry[prop]);
                    currentVal = JSON.stringify(tableEntry[prop]);
                    if (previousVal !== currentVal) {
                        previousTableEntry[prop][conditionName] = tableEntry[prop];
                    }
                }
            }
        }

    },

    compile: function(results) {
        var webkit = results.webkit;
        var gecko = results.gecko;
        var ie = results.ie;

        for (var char in webkit) {
            if (webkit.hasOwnProperty(char)) {

                this.updateTable(char, webkit[char]);

                if (gecko) {
                    if (!gecko.hasOwnProperty(char)) {
                        console.log('warning gecko has not captured "' + char + '"');
                    } else {
                        this.updateTable(char, gecko[char], 'isGecko');
                    }
                }

                if (ie) {
                    if (!ie.hasOwnProperty(char)) {
                        console.log('warning ie has not captured "' + char + '"');
                    } else {
                        this.updateTable(char, ie[char], 'isIE');
                    }
                }

            }
        }

    },

    createLayout: function(results, config) {

        this.compile(results);

        var platforms = {
            darwin: 'macosx',
            linux: 'linux',
            win32: 'windows'
        };

        var code = ((fs.readFileSync('./template.tpl')).toString())
            .replace(/__patterns__/g, this.convertPatternsToString())
            .replace(/__table__/g, this.convertTableToString())
            .replace(/__layout__/g, config.layout)
            .replace(/__platform__/g, platforms[process.platform])
            .replace(/__unicode__/g, !!config.unicode);

        var ast = UglifyJS.parse(code);
        var stream = UglifyJS.OutputStream({
            beautify: true
        });
        ast.print(stream);

        return stream.toString();
    },

    convertPatternsToString: function() {
        var array = [];

        this.patterns.forEach(function(pattern) {
            array.push(pattern.toString());
        });

        return '[' + array.join(', ') + ']';
    },

    convertTableToString: function () {
        var table = this.table;
        var array = [];

        for (var prop in table) {
            if (table.hasOwnProperty(prop)) {
                array.push(JSON.stringify(prop)+ ': ' + this.convertTableEntryToString(table[prop]));
            }
        }

        return '{' + array.join(', \n') + '}';
    },

    convertTableEntryToString: function (tableEntry) {
        var array = [];

        var obj = tableEntry;

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var val =  JSON.stringify(obj[prop]);

                if (typeof obj[prop].isGecko !== 'undefined') {
                    val = 'isGecko ? ' + JSON.stringify(obj[prop].isGecko) + ' : ' + val;
                }
                if (typeof obj[prop].isIE !== 'undefined') {
                    val = 'isIE ? ' + JSON.stringify(obj[prop].isIE) + ' : ' + val;
                }
                array.push('"' + prop +  '": ' + val);
            }
        }

        return '{' + array.join(', \n') + '}';
    }
};
