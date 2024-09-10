const express = require("express");
// const passport = require('../server/config/passport');
const cors = require("cors");
const authRoutes = require('../server/routes/authRoutes'); 
const userRoutes = require('../server/routes/useRoutes');

require("dotenv").config();

const connectToMongo = require("./db/connection");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET, 
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } 
// }));

app.use('/api/auth', authRoutes);  
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.get("/test", (req, res) => {
  res.json(
    "Server connection to client works!!  Good Luck with your capstones :D"
  );
});

module.exports = app;
