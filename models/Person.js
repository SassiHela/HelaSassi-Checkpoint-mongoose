const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Mary" },
  age: Number,
  favoriteFoods: [String],
});

module.exports = mongoose.model("persons", PersonSchema);
