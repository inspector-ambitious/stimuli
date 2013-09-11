Domino [![Build Status](https://travis-ci.org/yhwh/domino.png?branch=master)](https://travis-ci.org/yhwh/domino) 
======

A Dom Events injection library.

[Download latest stable version](http://yhwh.github.io/domino/build/domino.js)

Supported Browsers:

* IE8-10
* Firefox
* Chrome
* Safari
* PhantomJS

[Contributors Code Documentation](http://yhwh.github.io/domino/docs)

[Current Test Code Coverage](http://yhwh.github.io/domino/coverage)

How to build
------------

Install grunt:

    npm install -g grunt-cli

Install all required node modules: 

    npm install

Build domino in build/domino.js:

    grunt build

How to tests
------------

The js framework used for testing are: [mocha](http://visionmedia.github.io/mocha/),
[Sinon.JS](http://sinonjs.org/) and [expect.js](https://github.com/LearnBoost/expect.js/).

The tests are automatically run with [http://karma-runner.github.io/](http://karma-runner.github.io/)

To execute all the tests, use:

    grunt test

To lint all the js files:

    grunt jshint

To generate test coverage report in coverage/ folder, use:

    grunt testcoverage


Contributors Tips
------------------

* Send a pull request to the development branch

* Unit test everything (and try to avoid mocking)

* Design matters [SOLID Javascript](http://aspiringcraftsman.com/series/solid-javascript/)


