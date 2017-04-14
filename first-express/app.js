var express = require('express');

var app = express();

app.get("/", function(req,res){
    res.send("Hi there");
})

app.get("/bye", function(req, res){
    res.send("goodbye");
})

app.get("/dog", function(req, res){
    console.log("someone made a request to /dog");
    res.send("MEOW!");
})

app.get("/r/:subredditName", function(req, res){
    res.send("Welcome to a subreddit");
})

app.get("*", function(req, res){
    res.send("you are a star!");
})

app.listen(8000, 'localhost', function(){
    console.log("Server has started");
});