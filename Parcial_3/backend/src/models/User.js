const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    displayName: String,
    email: String,
    photo: String,
});

module.exports = mongoose.model('User', UserSchema);
