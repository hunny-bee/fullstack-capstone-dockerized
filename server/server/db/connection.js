const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(url, { useNewUrlParser: true });

  db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected: ", url);
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
  });
};

module.exports = connectToMongo;
