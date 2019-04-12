var express = require("express");
var router = express.Router();
var Pizza = require("../models/pizza");
//middleware
var middleware = require("../middleware/index");

// INDEX ROUTE -show all pizzas
router.get("/", (req,res)=>{
    //Get all pizzas from DB
    Pizza.find({},(err, allpizzas)=>{
        if(err){
            console.log(err);
        }else{
            res.render("pizzas/menu",{pizzas: allpizzas, page: "menu"});
        }
    })
    // rendering the pizza from data
});

//CREATE - Add new pizza to DB
router.post("/",middleware.checkIsAdmin ,(req, res)=>{
    req.body.pizza.author = {
        id: req.user._id,
        username: req.user.username
    };

    //create a new pizza and save to db
    Pizza.create(req.body.pizza, (err, newlyCreated)=>{
        if(err){
            console.log(err);
        } else{
            // redirect back to menu page
            req.flash("success", "Successfully Created a new pizza By:" + req.user.username);
            res.redirect("/pizzas");
        }

    });

});

//NEW - Show form to create new pizza
router.get("/new", middleware.isLoggedIn,middleware.checkIsAdmin,(req, res)=>{

    // form to add new pizza
    res.render("pizzas/new");
    // new make a post request to pizza
    //  processes the data and redirect to menu
});


//  EDIT PIZZA ROUTE
router.get("/:id/edit",middleware.checkIsAdmin,(req, res)=>{
    Pizza.findById(req.params.id, (err, foundPizza)=>{
        res.render("pizzas/edit",{pizza: foundPizza});
    });
});

//  UPDATE PIZZA ROUTE
router.put("/:id",middleware.checkIsAdmin ,(req,res)=>{
    // find and update the correct campground
    Pizza.findByIdAndUpdate(req.params.id, req.body.pizza, (err, updatedPizza)=>{
        if(err){
            req.flash("error", "Unable to update Pizza ");
            res.redirect("/pizzas");
        } else{
            req.flash("success", "Successfully Updated Pizza " );
            // redirect somewhere(show page)
            res.redirect("/pizzas");
        }
    })

});


// DESTROY PIZZA ROUTE
router.delete("/:id",middleware.checkIsAdmin ,(req,res)=>{
    Pizza.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            req.flash("error","Unable to delete");
            res.redirect("/pizzas")
        }else{
            req.flash("success","Pizza deleted");
            res.redirect("/pizzas")
        }
    })
});

module.exports = router;