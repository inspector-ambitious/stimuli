'use strict';



    var TestHelper = {

        ajax: function(method, url, callback) {
            var req;
            try {
                req = new XMLHttpRequest();
            } catch (ex) {
                req = new window.ActiveXObject("Microsoft.XMLHTTP");
            }
            req.onload = function() {
                req.onload = null;
                callback(this.responseText);
            };
            req.onreadystatechange = function() {
                if(req.readyState === 4){
                    req.onreadystatechange = null;
                    callback(this.responseText);
                }
            };
            req.open(method, url, true);
            req.send();
        },

        // Load a html fixture in the viewport document body
        loadFixture: function(viewport, name, callback) {

            if (!viewport.$('#fixtureContainer')) {
                var fixtureContainer = document.createElement('div');
                fixtureContainer.id = 'fixtureContainer';
                viewport.$('body').appendChild(fixtureContainer);
            }
            
            TestHelper.ajax('get', '/base/test/fixtures/' + name + '.html', function(response) {
                viewport.$('#fixtureContainer').innerHTML = response;
                callback();
            });
            
        },

        // remove a fixture
        removeFixture: function(viewport) {
            var fixtureContainer = viewport.$('#fixtureContainer');
            if (fixtureContainer) {
                fixtureContainer.innerHTML = '';
                if (fixtureContainer.childNodes.length === 0) {
                    viewport.$('body').removeChild(fixtureContainer);
                    fixtureContainer = null;
                }
            }
        }

    };