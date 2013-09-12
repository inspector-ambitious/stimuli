var TestHelper = {};

// Load a html fixture in the body
TestHelper.loadFixture = function(url, callback) {

    if (!$('#fixtures')) {
        $('body').append('<div id="fixtures"></div>');
    }

    $('#fixtures').load(url, callback);
};

// 
TestHelper.unloadFixture = function() {
    $('#fixtures').remove();
};