var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");

mongoose.connect("mongodb://localhost/authdemo");



var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "I like big butts and I cannot lie",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
    res.render("home");
});


app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret")
});

//AUTH ROUTES

// signup form
app.get("/register", function(req, res){
    res.render("register");
})

app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render('register');
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            })
        }
    })
})

//LOGIN ROUTES
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
})

app.get("/logoff", function(req, res){
    req.logout();
    res.redirect("/");  
});

function isLoggedIn(req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(8000, "localhost", function(){
    console.log("server started...");
});