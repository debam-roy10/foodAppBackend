const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    id: {type: String, required: true},
    img: {type: String, required: true},
    name: {type: String, required: true},
    dsc: {type: String, required: true},
    price: {type: Number, required: true},
    rate: {type: Number, required: true},
    reviews: {type: Number, required: true}, 
    preptime: {type: Number, required: true},
    tags: {type: [String], required: true},            
    type: {type: String, required: true}, 
    category: {type: String, required: true},
    origins: {type: String, required: true}
});

module.exports = mongoose.model("food", foodSchema);

