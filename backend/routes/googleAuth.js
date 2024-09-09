const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const userModel = require("../model/user");
const router = express.Router();

const handleGoogleAuthCallback = require("../controllers/handleGoogleAuthCallback");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const findUser = await userModel.findOne({ email: profile.email });
        if (findUser) {
            // console.log("inside finde user",findUser)
          return done(null, findUser);
        } else {
          const user = await userModel.create({
            username: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.email,
            password: profile.id.slice(-6) + profile.displayName,
          });
          console.log("inside create user",user)

          return done(null, user);
        }
      } catch (err) {
        console.log("error from passoport: " ,err);
        return done(err , null)
      }
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://dev.example.com:4321/login",
    session: false,
  }),
  handleGoogleAuthCallback
);

module.exports = router;
