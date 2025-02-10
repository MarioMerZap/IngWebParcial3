const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback después de autenticación con Google
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    if (!req.user) return res.redirect(`${process.env.VITE_URL}/login?error=auth_failed`);
    res.redirect(`${process.env.VITE_URL}/auth?token=${req.user.token}`);
});

module.exports = router;
