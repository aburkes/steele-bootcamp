var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// register form route
router.get('/', function(req, res){
    //something
    //res.render('campgrounds', {campgrounds: campgrounds});
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
        }
    })
});

router.post('/', middleware.isLoggedIn, function(req, res){
    // get data from form, add to campgrounds array
    // redirect to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var price = req.body.price;
    var newCampground = {
        name: name,
        price: price,
        image: image,
        description: desc,
        author: author
    };
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

router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

router.get('/:id', function(req, res){
    //find campground with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //render page with campground information
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       res.render("campgrounds/edit", {campground: foundCampground})
    });

});



// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    })
})



module.exports = router;