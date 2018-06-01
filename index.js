const express = require("express");
const mongoose = require("mongoose");
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/Users');
require("./services/passportConfig");

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI);

const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;

app.use("/auth/", authRoutes);

app.listen(PORT);   