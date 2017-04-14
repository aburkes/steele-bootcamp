var mongoose    = require('mongoose'),
    Campground  = require("./models/campground"),
    Comment = require("./models/comment");

var datum = [
    {
        name: "salmon creek",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "A creek made out of a living salmon."
    },
    {
        name: "geranimo",
        image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
        description: "The camp you go to for adventure."
    },
    {
        name: "cod creek", 
        image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description: "Because \"God Creek\" was already taken"
    }

];

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds");
                datum.forEach(function(seed){
                    Campground.create(seed, function(err, campground){
                        if(err) {
                            console.log(err);
                        } else {
                            console.log("added a campground!");
                            //create a comment
                            Comment.create(
                                {
                                    text: "Great!",
                                    author: "Homer"
                                }, function(err, comment){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created new Comment");
                                    }
                                }
                            )
                        }
                    })
                })
        }
    });

    
}

module.exports = seedDB;