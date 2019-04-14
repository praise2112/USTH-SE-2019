var moongose = require("mongoose");
var Pizza = require("../models/pizza");

var pizzaData = [
    {
        name: "Cheese Pizza",
        cost: 10.05,
        image: "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?auto=compress",
        description: "Real cheese made from mozzarella, pizza sauce and buttery garlic crust."
    },
    {
        name: "Pepperoni Pizza",
        cost: 10.95,
        image: "https://images.pexels.com/photos/774487/pexels-photo-774487.jpeg?auto=compress",
        description: "Premium pepperoni, real cheese made from mozzarella and buttery garlic crust."
    },
    {
        name: "Sausage Pizza",
        cost: 11.25,
        image: "https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress",
        description: "Sausage and real cheese made from mozzarella and buttery garlic crust."
    },
    {
        name: "Garden Pizza",
        cost: 11.15,
        image: "https://images.pexels.com/photos/263041/pexels-photo-263041.jpeg?auto=compress",
        description: "Onions, sliced tomatoes, pizza sauce and signature three-cheese blend."
    }
]

function seedDB() {
    //Remove all pizza
    Pizza.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed all pizzas in the database!");
        // add a few pizza
        pizzaData.forEach(function (seed) {
            Pizza.create(seed, function (err, pizza) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added a new pizza");
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
