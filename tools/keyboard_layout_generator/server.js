'use strict';
var express = require('express');
var app = express();

module.exports = {

    start: function(port) {
        var self = this;

        app.configure(function(){
            app.use('/', express.static(__dirname + '/html'));
            app.use('/src', express.static(__dirname + '/../../src'));
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(app.router);
        });

        app.get('/', function(req, res) {
            res.redirect('/index.html')
        });

        app.get('/connect', function(req, res) {
            res.send('');
            self.onBrowserConnected();
        });

        app.post('/results', function(req, res) {
            res.send('');
            self.onResults(req.body);
        });

        app.listen(port);
    },

    onBrowserConnected: function() {},

    onResults: function() {}

};