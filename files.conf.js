'use strict';
var pkg = JSON.parse(require('fs').readFileSync('package.json'));

// Distribution folder
var distFolder = './dist/';

// StimuliFiles
var stimuliFiles = [
    // dependencies
    'lib/sizzle/sizzle.js',

    // core
    'src/stimuli.js',

    'src/core/support.js',
    'src/core/object.js',
    'src/core/array.js',
    'src/core/class.js',
    'src/core/observable.js',
    'src/core/scheduler.js',
    'src/core/chainable.js',
    'src/core/ajax.js',

    'src/event/emitter.js',
    'src/event/observer.js',
    'src/event/synthetizer/html.js',
    'src/event/synthetizer/mouse.js',
    'src/event/synthetizer/keyboard.js',
    'src/event/synthetizer/text.js',

    'src/shared/recorder.js',
    'src/shared/viewport.js',
    'src/shared/context.js',
    'src/shared/command.js',

    'src/virtual/browser.js',
    'src/browser/iframe.js',
    'src/browser/history.js',


    'src/virtual/mouse.js',
    'src/mouse/helper.js',
    'src/mouse/click.js',
    'src/mouse/context_menu.js',
    'src/mouse/dblclick.js',
    'src/mouse/up.js',
    'src/mouse/down.js',


    'src/virtual/keyboard.js',
    'src/keyboard/layout/generic.js',
    'src/keyboard/layout/macosx/us.js',
    'src/keyboard/helper.js',
    'src/keyboard/type_text.js'

];


// GENERATE FILES CONFIGURATION FOR KARMA (DEV AND CI MODE)

// Shared files loaded by karma test runner
var sharedTestFiles = [
    {
        pattern: 'node_modules/expect.js/expect.js',
        watched: false
    },

    {
        pattern: 'node_modules/sinon/pkg/sinon-timers-*js',
        watched: false
    },

    {
        pattern: 'test/fixtures/**/*.*',
        included: false
    }

];

// Files loaded by karma test runner for development
var testFilesDev = [];

// Files loaded by karma test runner for continuous integration (build)
var testFilesBuild = [{
    pattern: distFolder + pkg.name + '.js'
}];

// Add all stimulis sources for development
stimuliFiles.forEach(function(stimuliFile) {
    testFilesDev.push({
        pattern: stimuliFile
    });
});

// add shared files
sharedTestFiles.forEach(function(shared) {
    testFilesDev.push(shared);
    testFilesBuild.push(shared);
});


// test specs
var specs = [{
    pattern: 'test/mocha_setup.js'

},{
    pattern: 'test/unit/**/*.js'
}];

// add specs to both mode
specs.forEach(function(spec) {
    testFilesDev.push(spec);
    testFilesBuild.push(spec);
});

module.exports = {
    pkg: pkg,
    distFolder: distFolder,
    stimuliFiles: stimuliFiles,
    testFilesDev: testFilesDev,
    testFilesBuild: testFilesBuild
};