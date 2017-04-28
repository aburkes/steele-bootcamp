var mongoose    = require('mongoose'),
    Campground  = require("./models/campground"),
    Comment = require("./models/comment");

var datum = [
    {
        name: "salmon creek",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet lacus mattis, consequat urna quis, volutpat lorem. Aenean ultricies pharetra dui, vitae lobortis leo commodo nec. Donec blandit felis leo, non fermentum massa iaculis sollicitudin. Aenean vel consequat elit, vel sodales turpis. Sed sed porttitor arcu. Aenean porttitor nisl nec libero commodo dapibus. Donec bibendum ultricies nisi, nec lacinia erat rhoncus a. Fusce turpis lorem, cursus ac sapien et, dapibus feugiat tellus. Cras feugiat aliquet purus non scelerisque. Vestibulum cursus condimentum blandit. Nullam magna leo, porttitor vel sem non, rhoncus malesuada lectus. Cras venenatis, sem eget lacinia consequat, est magna tempus massa, sit amet tempor dolor nunc eu massa. Sed convallis vitae ipsum eget tincidunt."
    },
    {
        name: "geranimo",
        image: "https://farm5.staticflickr.com/4153/4835814837_feef6f969b.jpg",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet lacus mattis, consequat urna quis, volutpat lorem. Aenean ultricies pharetra dui, vitae lobortis leo commodo nec. Donec blandit felis leo, non fermentum massa iaculis sollicitudin. Aenean vel consequat elit, vel sodales turpis. Sed sed porttitor arcu. Aenean porttitor nisl nec libero commodo dapibus. Donec bibendum ultricies nisi, nec lacinia erat rhoncus a. Fusce turpis lorem, cursus ac sapien et, dapibus feugiat tellus. Cras feugiat aliquet purus non scelerisque. Vestibulum cursus condimentum blandit. Nullam magna leo, porttitor vel sem non, rhoncus malesuada lectus. Cras venenatis, sem eget lacinia consequat, est magna tempus massa, sit amet tempor dolor nunc eu massa. Sed convallis vitae ipsum eget tincidunt."
    },
    {
        name: "cod creek", 
        image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet lacus mattis, consequat urna quis, volutpat lorem. Aenean ultricies pharetra dui, vitae lobortis leo commodo nec. Donec blandit felis leo, non fermentum massa iaculis sollicitudin. Aenean vel consequat elit, vel sodales turpis. Sed sed porttitor arcu. Aenean porttitor nisl nec libero commodo dapibus. Donec bibendum ultricies nisi, nec lacinia erat rhoncus a. Fusce turpis lorem, cursus ac sapien et, dapibus feugiat tellus. Cras feugiat aliquet purus non scelerisque. Vestibulum cursus condimentum blandit. Nullam magna leo, porttitor vel sem non, rhoncus malesuada lectus. Cras venenatis, sem eget lacinia consequat, est magna tempus massa, sit amet tempor dolor nunc eu massa. Sed convallis vitae ipsum eget tincidunt."
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