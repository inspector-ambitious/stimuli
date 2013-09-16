'use strict';

var TestHelper = {};

// Load a html fixture in the body
TestHelper.loadTemplate = function(url, callback) {

    if (Domino.$('#template').length === 0) {
        Domino.$('body').append('<div id="template"></div>');
    }
    
    Domino.$('#template').load(url, callback);
};

// 
TestHelper.removeTemplate = function() {
     Domino.$('#template').remove();
};