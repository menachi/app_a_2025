import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import posts_routes from "./routes/posts_routes";

const initApp = (): Promise<Express> => {
  return new Promise<Express>((resolve, reject) => {
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

export default initApp;