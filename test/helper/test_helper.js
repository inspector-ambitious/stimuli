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

        // Load a html fixture in the body
        loadFixture: function(name, callback) {

            if (!Stimuli.$('#fixtureContainer')) {
                var fixtureContainer = document.createElement('div');
                fixtureContainer.id = 'fixtureContainer';
                Stimuli.$('body').appendChild(fixtureContainer);
            }
            
            TestHelper.ajax('get', 'base/test/fixtures/' + name + '.html', function(response) {
                Stimuli.$('#fixtureContainer').innerHTML = response;
                callback();
            });
            
        },

        // remove a fixture
        removeFixture: function(fixture) {
            var fixtureContainer = Stimuli.$('#fixtureContainer');
            if (fixtureContainer) {
                fixtureContainer.innerHTML = '';
                if (fixtureContainer.childNodes.length === 0) {
                    Stimuli.$('body').removeChild(fixtureContainer);
                    fixtureContainer = null;
                }
            }
        }

    };