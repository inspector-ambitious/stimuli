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
    'src/core/class.js',
    'src/core/observable.js',


    'src/core/scheduler.js',
    'src/core/deferable.js',
    'src/core/recorder.js',

    'src/core/context.js',

    'src/core/ajax.js',
    'src/core/iframe.js',
    'src/core/history.js',

    'src/view/viewport.js',
    'src/view/event/emitter.js',
    'src/view/event/observer.js',
    'src/view/event/synthetizer/mouse.js',

    'src/virtual/mouse.js',
    'src/virtual/browser.js',

    'src/command/generic.js',
    'src/command/mouse/helper.js',
    'src/command/mouse/click.js',
    'src/command/mouse/dblclick.js'

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
var testFilesBuild = [];

// add shared files
sharedTestFiles.forEach(function(shared) {
    testFilesDev.push(shared);
    testFilesBuild.push(shared);
});

// Add all stimulis sources for development
stimuliFiles.forEach(function(stimuliFile) {
    testFilesDev.push({
        pattern: stimuliFile
    });
});

// Add freshly build stimuli
testFilesBuild.push({
    pattern: distFolder + pkg.name + '-' + pkg.version + '.js'
});


// test specs
var specs = [{
    pattern: 'test/unit/core/history.js'
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