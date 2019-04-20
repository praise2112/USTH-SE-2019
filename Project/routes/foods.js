var express = require("express");
var router = express.Router();
var Food = require("../models/food");
var Cart = require("../models/cart");


//middleware
var middleware = require("../middleware/index");

// INDEX ROUTE -show all food
router.get("/", (req,res)=>{
    //Get all food from DB
    Food.find({},(err, allfood)=>{
        if(err){
            console.log(err);
        }else{
            var toggle = req.session.toggleModal;
            var toggleCheckout = req.session.toggleCheckout;
            req.session.toggleModal = false;
            req.session.toggleCheckout = false;
            // shopping cart
            if(!req.session.cart){  // if cart is empty
                return res.render("foods/menu",{foods: allfood, cartfoods: null, toggleModal:toggle  ,csrfToken: req.csrfToken(),page: "menu"});
            }
            var cart = new Cart(req.session.cart);
            res.render("foods/menu", {
                    foods: allfood,
                    cartfoods:cart.generateArray(),
                    totalCost: cart.totalCost,
                    toggleModal:toggle ,
                    toggleCheckout: toggleCheckout,
                    csrfToken: req.csrfToken(),
                    page: "menu"});
            }
    })
    // rendering the food from data
});

//  To go to the old position of the previous item when item is added to the cart
router.get("/oldPosition", (req,res)=>{
    var oldPosition = req.session.oldPosition;
    req.session.oldPosition = "";
    if(oldPosition){
        var script = "<script> window.location.href='/foods"+oldPosition+"';</script>";
        console.log(script);
        res.send(script);
    } else{
        res.redirect("/foods");
    }
});




//CREATE - Add new food to DB
router.post("/",middleware.checkIsAdmin ,(req, res)=>{
    req.body.food.author = {
        id: req.user._id,
        username: req.user.username
    };
    //create a new food and save to db
    Food.create(req.body.food, (err, newlyCreated)=>{
        if(err){
            console.log(err);
        } else{
            // redirect back to menu page
            req.flash("success", "Successfully Created a new food By:" + req.user.username);
            res.redirect("/foods");
        }

    });

});

//NEW - Show form to create new food
router.get("/new", middleware.isLoggedIn,middleware.checkIsAdmin,(req, res)=>{

    // form to add new food
    res.render("foods/new");
    // new make a post request to food
    //  processes the data and redirect to menu
});


//  EDIT FOOD ROUTE
router.get("/:id/edit",middleware.checkIsAdmin,(req, res)=>{
    Food.findById(req.params.id, (err, foundFood)=>{
        res.render("foods/edit",{food: foundFood});
    });
});

//  UPDATE PIZZA ROUTE
router.put("/:id",middleware.checkIsAdmin ,(req,res)=>{
    // find and update the correct campground
    Food.findByIdAndUpdate(req.params.id, req.body.food, (err, updatedFood)=>{
        if(err){
            req.flash("error", "Unable to update Food ");
            res.redirect("/foods");
        } else{
            req.flash("success", "Successfully Updated Food " );
            // redirect somewhere(show page)
            res.redirect("/foods");
        }
    })

});


// DESTROY PIZZA ROUTE
router.delete("/:id",middleware.checkIsAdmin ,(req,res)=>{
    Food.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            req.flash("error","Unable to delete");
            res.redirect("/foods")
        }else{
            req.flash("success","Food deleted");
            res.redirect("/foods")
        }
    })
});

module.exports = router;