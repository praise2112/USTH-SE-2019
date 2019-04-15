var moongose = require("mongoose");
var Food = require("../models/pizza");

var foodData = [
    // PIZZA
    {
        name: "Cheese Pizza",
        type: "pizza",
        cost: 10.05,
        image: "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?auto=compress",
        description: "Real cheese made from mozzarella, pizza sauce and buttery garlic crust."
    },
    {
        name: "Pepperoni Pizza",
        type: "pizza",
        cost: 10.95,
        image: "https://images.pexels.com/photos/774487/pexels-photo-774487.jpeg?auto=compress",
        description: "Premium pepperoni, real cheese made from mozzarella and buttery garlic crust."
    },
    {
        name: "Sausage Pizza",
        type: "pizza",
        cost: 11.25,
        image: "https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress",
        description: "Sausage and real cheese made from mozzarella and buttery garlic crust."
    },
    {
        name: "Garden Pizza",
        type: "pizza",
        cost: 11.15,
        image: "https://images.pexels.com/photos/263041/pexels-photo-263041.jpeg?auto=compress",
        description: "Onions, sliced tomatoes, pizza sauce and signature three-cheese blend."
    },
    {
        name: "Greek Pizza",
        type: "pizza",
        cost: 10.20,
        image: "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress",
        description: "Onions, sliced tomatoes, pizza sauce and signature three-cheese blend."
    },
    {
        name: "Greek Pizza",
        type: "pizza",
        cost: 10.20,
        image: "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress",
        description: "Onions, sliced tomatoes, pizza sauce and signature three-cheese blend."
    },
    {
        name: "Greek Pizza",
        type: "pizza",
        cost: 10.20,
        image: "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress",
        description: "Onions, sliced tomatoes, pizza sauce and signature three-cheese blend."
    },
    {
        name: "Greek Pizza",
        type: "pizza",
        cost: 10.20,
        image: "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress",
        description: "Onions, sliced tomatoes, pizza sauce and signature three-cheese blend."
    },

    // DRINKS
    {
        name: "Braxston Beer",
        type: "drink",
        cost: 1.49,
        image: "https://images.unsplash.com/photo-1547122719-ebf42306abd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60g",
        description: "200 calories"
    },
    {
        name: "Pepsi",
        type: "drink",
        cost: 1.20,
        image: "https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress",
        description: "200 calories"
    },
    {
        name: "Coke",
        type: "drink",
        cost: 1.15,
        image: "https://images.unsplash.com/photo-1520568444554-4698653b539c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "225 calories"
    },
    {
        name: "Juice",
        type: "drink",
        cost: 1.6,
        image: "https://images.unsplash.com/photo-1514995669114-6081e934b693?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "180 calories"
    },

]

function seedDB() {
    //Remove all pizza
    Food.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed all pizzas in the database!");
        // add a few pizza
        foodData.forEach(function (seed) {
            Food.create(seed, function (err, pizza) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added a new " + seed.type);
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
