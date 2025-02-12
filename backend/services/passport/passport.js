const passport = require('passport');
const User = require('../../database/models/user.model');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, cb) => {
    cb(null, user.id);  // Storing only the user ID
  });
  
  passport.deserializeUser(async (id, cb) => {
    const user = await User.findById(id);
    cb(null, user);  // Fetching the user based on ID
  });
  
// Google strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.O_CLIENT_ID,
            clientSecret: process.env.O_CLIENT_SECRET,
            callbackURL: process.env.O_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

// Facebook strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.F_CLIENT_ID,
            clientSecret: process.env.F_CLIENT_SECRET,
            callbackURL: process.env.F_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'email', 'photos'],
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )
);

module.exports = passport;