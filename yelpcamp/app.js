var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    seedDB      = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




app.get('/', function(req, res){
    res.render("landing");
});

app.get('/campgrounds', function(req, res){
    //something
    //res.render('campgrounds', {campgrounds: campgrounds});
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    })
});

app.post('/campgrounds', function(req, res){
    // get data from form, add to campgrounds array
    // redirect to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //create  new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            //redirect to campgrounds page
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

app.get('/campgrounds/:id', function(req, res){
    //find campground with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
    //render page with campground information
});


app.listen(8000, 'localhost', function(){
    console.log('yelpcamp has started');
});