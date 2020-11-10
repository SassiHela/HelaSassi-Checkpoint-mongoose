const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const router = require("./routes/person");

//middleware
//au lieu d'utiliser body parser
app.use(express.json());

app.use("/persons", router);

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

const Person = require("./models/Person");
