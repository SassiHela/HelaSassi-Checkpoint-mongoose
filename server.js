const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

//Connection to server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on localhost " + port);
});

app.get("/", (req, res) => res.send("Server is up and running"));

// Connction DB
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const Person = require("./person");

//Create and Save a Record of a Model

// const newPerson = new Person({
//   name: "Elliot Alderson",
//   age: 23,
//   favoriteFoods: ["Ships", "Pizza"],
// });

// newPerson
//   .save()
//   .then((doc) => {
//     console.log("User Elliot Alderson added");
//     console.log(doc);
//   })
//   .catch((err) => console.log(err));

// //Create Many Records with model.create()

// const arrayOfPeople = [
//   {
//     name: "Hela",
//     age: 27,
//     favoriteFoods: ["Pasta", "Pizza"],
//   },
//   {
//     name: "Mohamed",
//     age: 26,
//     favoriteFoods: ["Tajine", "Soupe", "Pizza"],
//   },
//   {
//     name: "Narjes",
//     age: 23,
//     favoriteFoods: ["Tajine", "Couscous"],
//   },
//   {
//     name: "Hela",
//     age: 4,
//     favoriteFoods: ["Poulet grillé", "Couscous"],
//   },
// ];

// Person.create(arrayOfPeople)
//   .then((docs) => {
//     console.log("Users added");
//     console.log(docs);
//   })
//   .catch((err) => console.log(err));

// Find all the people having the name Hela,
Person.find({ name: "Hela" })
  .then((docs) => {
    console.log("Users with name Hele");
    console.log(docs);
  })
  .catch((err) => console.log(err));

//Find just one person which has a PIZZA in the person's favorites food

Person.findOne({ favoriteFoods: "Pizza" })
  .then((doc) => {
    console.log("First user with favorite food Pizza");
    console.log(doc);
  })
  .catch((err) => console.log(err));

//Find the person having a given _id, e.g Narjes Id
Person.findById("5faa63feebddc33134fc3549")
  .then((doc) => {
    console.log("User having the id 5faa63feebddc33134fc3549");
    console.log(doc);
  })
  .catch((err) => console.log(err));

//Add "hamburger" to Mohamed's favoriteFoods
Person.findById("5faa54e5f0286c32ec8f1576")
  .then((doc) => {
    doc.favoriteFoods.push("hamburger");
    doc.save();
    console.log("hamburger added to Mohamed's favourite foods");
    console.log(doc);
  })
  .catch((err) => console.log(err));

//Find a person by Name and set the person's age to 20.
Person.findOneAndUpdate({ name: "Mohamed" }, { age: 20 }, { new: true })
  .then((doc) => {
    console.log("User updated");
    console.log(doc);
  })
  .catch((err) => console.log(err));

//Delete one person
Person.findOneAndDelete({ name: "Elliot Alderson" })
  .then((doc) => {
    console.log("User Elliot Alderson deleted");
    console.log(doc);
  })
  .catch((err) => console.log(err));

//collection.remove is deprecated.
Person.deleteMany({ name: "Hela" })
  .then((res) => {
    console.log("Number of documents removed " + res.deletedCount);
  })
  .catch((err) => console.log(err));

//Chain Search Query
Person.find({ favoriteFoods: "Pizza" })
  .sort({ name: 1 }) // sort ascending by name
  .limit(2)
  .select({ age: false })
  .exec() // execute the query
  .then((docs) => {
    console.log("Chain Search Query");
    console.log(docs);
  })
  .catch((err) => {
    console.error(err);
  });
