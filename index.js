const express = require("express");
const bodyParser = require("body-parser");
const ticketRoutes = require("./api/routes/ticketRouts");
const usersRoutes = require("./api/routes/mainRoutes");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(console.log("connected"))
  .catch((err) => {
    console.log("xxxxxxxxxxxxxxxxxx");
    console.log(err);
  });

app.use(ticketRoutes);
app.use(usersRoutes);

app.listen(3000);
