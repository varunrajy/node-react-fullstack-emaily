const passport = require("passport");
const express = require("express");
const User = require("../models/Users");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
const router = express.Router();

const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");

router.post("/survey/new", requireLogin, async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  if (req.user.credits < 1) {
    res.status(403).send({ error: "Not enough credits!" });
  }
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  });
  console.log(survey);
  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(422).send(err);
  }
});

module.exports = router;

// router.get(
//   "/google/",
//   passport.authenticate("google", {
//     scope: ["profile", "email"]
//   })
// );

// router.get("/google/callback", passport.authenticate("google"), (req, res) => {
//   res.redirect("/surveys");
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

// router.get("/current_user", (req, res) => {
//   res.send(req.user);
// });

// router.post("/addcredits", requireLogin, async (req, res) => {
//   const credit = await stripe.charges.create({
//     amount: 500,
//     currency: "usd",
//     description: "5$ for 5 emaily credits",
//     source: req.body.id
//   });
//   req.user.credits += 5;
//   const user = await req.user.save();
//   res.send(user);
// });
