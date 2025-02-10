const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    callbackURL: `${process.env.VITE_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    const user = { 
        id: profile.id, 
        email: profile.emails[0].value, 
        name: profile.displayName 
    };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return done(null, { user, token });
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
