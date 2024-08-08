const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
let mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "https://ethaum-backend.vercel.app/auth/google/callback/",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const picture = profile.photos[0].value;
      console.log(profile.displayName, picture);

      // check if user already exists
      const currentUser = await User.findOne({ googleId: profile.id });
      if (currentUser) {
        // already have the user -> return (login)
        return done(null, currentUser);
      } else {
        // register user and return
        const newUser = await new User({
          email: email,
          googleId: profile.id,
          username: profile.displayName,
          picture: picture,
        }).save();
        return done(null, newUser);
      }
    }
  )
);
