var TestHelper = {};

// Load a html fixture in the body
TestHelper.loadTemplate = function(url, callback) {

    if ($('#template').length === 0) {
        $('body').append('<div id="template"></div>');
    }
    $('#template').load(url, callback);
};

// 
TestHelper.removeTemplate = function() {
    $('#template').remove();
};