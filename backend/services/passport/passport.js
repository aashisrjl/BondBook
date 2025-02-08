const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// Serialize and deserialize user
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((id, cb) => {
    cb(null, id);
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
