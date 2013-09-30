[![Build Status](https://travis-ci.org/yhwh/stimuli.png?branch=master)](https://travis-ci.org/yhwh/stimuli) 

Cross Browser tested on each build thanks to [BrowserStack](http://www.browserstack.com/)'s support!

Description
-----------

A testing framework using dom events injection to simulates users interaction.


Supported Browsers
------------------

* IE8+
* Firefox ESR+
* Chrome 23+
* Safari 6+
* PhantomJS 1.9+
* Opera 15+
* Android 4

How to build
------------

Install grunt:

    npm install -g grunt-cli

Install all required node modules: 

    npm install

Build stimuli in build/:

    grunt build

How to tests
------------

The js framework used for testing are: [mocha](http://visionmedia.github.io/mocha/),
[Sinon.JS](http://sinonjs.org/) and [expect.js](https://github.com/LearnBoost/expect.js/).

The tests are automatically run with [karma](http://karma-runner.github.io/).

To test IE with [ievms](https://github.com/xdissent/ievms):

    curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | env IEVMS_VERSIONS="8 9 10" bash

To quickly execute the test once with PhantomJS:

    grunt quicktest

To continuously run the tests on all browsers:

    grunt watchtest

To lint all the js files:

    grunt lint

To generate lcov test coverage report in coverage/ folder:

    grunt cov


Contributors Tips
------------------

* Send pull requests to the development branch.

* Unit test all the fucking time.

* Design matters [SOLID Javascript](http://aspiringcraftsman.com/series/solid-javascript/).
