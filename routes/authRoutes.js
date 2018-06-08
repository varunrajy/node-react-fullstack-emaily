const passport = require("passport");
const express = require("express");
const User = require("../models/Users");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const router = express.Router();

router.get(
  "/google/",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/surveys");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

router.post("/addcredits", requireLogin, async (req, res) => {
  const credit = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "5$ for 5 emaily credits",
    source: req.body.id
  });
  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});

module.exports = router;
