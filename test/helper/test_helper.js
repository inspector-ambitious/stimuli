'use strict';

var TestHelper = {};

// Load a html fixture in the body
TestHelper.loadTemplate = function(url, callback) {

    if (Stimuli.$('#template').length === 0) {
        Stimuli.$('body').append('<div id="template"></div>');
    }
    
    Stimuli.$('#template').load(url, callback);
};

// 
TestHelper.removeTemplate = function() {
     Stimuli.$('#template').remove();
};