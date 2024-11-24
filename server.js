const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const posts_routes = require("./routes/posts_routes");

const initApp = () => {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected to the database");
    });
    mongoose
      .connect(process.env.DB_CONNECT)
      .then(() => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use("/posts", posts_routes);
        resolve(app);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = initApp;
