const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// Add contact
// @ route : localhost:3000/persons/addPerson
router.post("/addPerson", (req, res) => {
  const { name, age, favoriteFoods } = req.body;
  const newPerson = new Person({
    name,
    age,
    favoriteFoods,
  });
  newPerson
    .save()
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
});

// Add personS
// @ route : localhost:3000/persons/addPersons
router.get("/addPersons", (req, res) => {
  const arrayOfPeople = [
    {
      name: "Hela",
      age: 27,
      favoriteFoods: ["Pasta", "Pizza"],
    },
    {
      name: "Mohamed",
      age: 26,
      favoriteFoods: ["Tajine", "Soupe", "Pizza"],
    },
    {
      name: "Narjes",
      age: 23,
      favoriteFoods: ["Tajine", "Couscous"],
    },
    {
      name: "Hela",
      age: 4,
      favoriteFoods: ["Poulet grillé", "Couscous"],
    },
  ];
  Person.create(arrayOfPeople)
    .then((docs) => {
      res.send("Users added \n" + docs);
    })
    .catch((err) => console.log(err));
});

//  Find all the people having the name Hela,
//// @ route : localhost:3000/persons/person/Hela
router.get("/:name", (req, res) => {
  const { name } = req.params;
  Person.find({ name })
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
});

// Find just one person which has a PIZZA in the person's favorites food
//// @ route : localhost:3000/persons/foods/Pizza
router.get("/foods/:food", (req, res) => {
  const { food } = req.params;
  Person.findOne({ favoriteFoods: food })
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
});

// //Find the person having a given _id, e.g Narjes Id
//// @ route : localhost:3000/persons/person/5faa7b2fe0b2f81e4c933ca5
router.get("/person/:id", (req, res) => {
  const { id } = req.params;
  Person.findById({ _id: id })
    .then((doc) => res.send(doc))
    .catch((err) => console.log(err));
});

// //Add "hamburger" to Mohamed's favoriteFoods
//// @ route : localhost:3000/persons/editPerson/5faa7b2fe0b2f81e4c933ca4

router.put("/editPerson/:id", (req, res) => {
  const { id } = req.params;
  const food = req.body.food;
  Person.findById({ _id: id })
    .then((doc) => {
      doc.favoriteFoods.push(food);
      doc.save();
      res.send(doc);
    })
    .catch((err) => console.log(err));
});

// //Find a person by Name and set the person's age to 20.
//// @ route : localhost:3000/persons/editAge/Mohamed

router.put("/editAge/:name", (req, res) => {
  const { name } = req.params;
  Person.findOneAndUpdate({ name }, { $set: req.body }, { new: true })
    .then((doc) => res.send(doc))
    .catch((err) => console.log(err));
});

//Delete one person
// @ route : localhost:3000/persons/deletePerson/Elliot Alderson

router.delete("/deletePerson/:name", (req, res) => {
  const { name } = req.params;
  Person.findOneAndDelete({ name })
    .then((doc) => res.send(doc))
    .catch((err) => console.log(err));
});

//Delete  all persons with name : "Hela"
// @ route : localhost:3000/persons/deleteMany/Hela

router.delete("/deleteMany/:name", (req, res) => {
  const { name } = req.params;
  Person.deleteMany({ name })
    .then((doc) => res.send(doc))
    .catch((err) => console.log(err));
});
//Chain Search Query
// @ route : localhost:3000/persons/chain/hamburger
router.get("/chain/:food", (req, res) => {
  const { food } = req.params;
  Person.find({ favoriteFoods: food })
    .sort({ name: 1 }) // sort ascending by name
    .limit(2)
    .select({ age: false })
    .exec() // execute the query
    .then((docs) => res.send(docs))
    .catch((err) => console.log(err));
});

module.exports = router;
