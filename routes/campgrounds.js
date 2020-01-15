var express = require("express"),
	router = express.Router();

var Campground = require("../models/campground");

var middleware = require("../middleware");
//========================
// CAMPGROUND ROUTES
//========================


//INDEX
router.get('/', function(req, res){
	//Get all campgrounds from db
	Campground.find({}, function(err, campgrounds){
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	})
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form and add to the array
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: description, author: author, price: price};
	//Create a new campground and save it to DB
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		} else {
			console.log("New Campground Created");
			console.log(newCampground);
			res.redirect("/campgrounds")
		}
	})
	// campgrounds.push(newCampground);
	//redirect to /campgrounds
	// res.redirect('/campgrounds');
});

//NEW
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('campgrounds/new');
});

//SHOW
router.get("/:id", function(req, res){
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("back");
		} else {
			res.render('campgrounds/show', {campground: foundCampground});
		}
	})
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("back")
		} else {
		res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err || !updatedCampground){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground deleted");
			res.redirect("/campgrounds");
		}
	});
});




module.exports = router;
