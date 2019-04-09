


// all the middleware goes here
var middlewareObj ={};

middlewareObj.checkIsAdmin = (req, res, next)=>{
    // logged in
    if(req.isAuthenticated()  && req.user.isAdmin){
       next();
    }else{


        req.flash("error","you need to be an Admin to do that!");
        res.redirect("back");  // take the user to= the previous page

    }
};

middlewareObj.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    // in the flash add this string for the next req
    req.flash("error", "You need to logged in to do that!");
    res.redirect("/login");
};
module.exports = middlewareObj;