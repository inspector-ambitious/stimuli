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
* Safari 5.1+
* PhantomJS 1.9+
* Opera 15+
* Android 4+
* IOS 6+

How to build
------------

Install grunt:

    npm install -g grunt-cli

Install bower:

    npm install -g bower

Install all required node modules: 

    npm install

Build stimuli in build/:

    grunt build

How to tests
------------

The testing frameworks are: [mocha](http://visionmedia.github.io/mocha/),
[Sinon.JS](http://sinonjs.org/) and [expect.js](https://github.com/LearnBoost/expect.js/).

The tests are automatically run with [karma](http://karma-runner.github.io/).

To continuously run the tests on the browsers of your choice:

    grunt karma_watch

To lint all the js files:

    grunt jshint
