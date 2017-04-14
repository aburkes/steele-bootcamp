var request = require('request');
var express = require('express');
var app = express();

app.set("view engine", "ejs");

var omdb = "http://omdbapi.com/?s="

request('http://omdbapi.com?s=california', function(error, response, body){
    if(!error && response.statusCode == 200){
        console.log('request made');
    }
});

app.get("/results", function(req, res){
    //res.send('it works!');
    var results;
    var search = req.query.search;
    request(omdb + search, function(error, response, body){
        if(!error && response.statusCode == 200){
            console.log('request made');
            results = JSON.parse(body);
            res.render('results', {data: results});
        }
    });
});

app.get('/', function(req, res){
    res.render("search");
});

app.listen(8000, 'localhost', function(){
    console.log('server has started')
});


