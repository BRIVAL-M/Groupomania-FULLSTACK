const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// Import the uniqueValidator middleware for check the uniqueness of the user's email

const userSchema = mongoose.Schema({ // Create the user schema for the database

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //isAdmin: { type: Boolean, required: true, default: false },
    role: { type: String, required: true, default: 'user' },

});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);