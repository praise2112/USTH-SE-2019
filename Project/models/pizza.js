var mongoose = require("mongoose");
// SCHEMA SETUP
let pizzaSchema = new mongoose.Schema({
    name: String,
    type: String,
    cost: Number,
    image: String,
    imageId: String,    // for deleting in cloudinary
    description: String,

    //time stamp
    createdAt: { type: Date, default: Date.now},
    // to get the person who created the campground
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },

    rating: {
        type: Number,
        default: 0
    }
});
var Pizza = mongoose.model("Pizza", pizzaSchema);
module.exports = Pizza;