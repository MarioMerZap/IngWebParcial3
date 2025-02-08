const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), 
    (req, res) => {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.redirect(`${process.env.FRONTEND_URL}/auth?token=${token}`);
    }
);

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect(process.env.FRONTEND_URL);
    });
});

module.exports = router;
