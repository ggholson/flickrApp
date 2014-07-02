var https = require('https');
var express = require('express');
var fs = require('fs');
var app = express();

var key = '&api_key=c3e4a3df9fbb67ce58a5441924d127bb'

app.get('/search', function(req, res) {

    /*fs.readFile('index.html', function(err, data) {
        if (err) throw err;

        res.send(data.toString());
        })
    */
    function flickrSearch(text, page) {

        https.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&text=' + text + '&page=' + page + key, function(result) {
            console.log("statusCode: ", result.statusCode);
            console.log("headers: ", result.headers);

            var data = ""
            result.on('data', function(d) {
                data += d;
            });

            result.on('end', function() {
                console.log(data.toString());
                res.send(data.toString());
            }).on('error', function(e) {
                console.error(e);
            });
        });

    }

    console.log("Querying");
    flickrSearch(req.query.text, req.query.page);

});

console.log("Starting to listen");

var server = app.listen(3000, function() {
    console.log('Listening on port' + server.address().port);
});