const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// Import the uniqueValidator middleware for check the uniqueness of the user's email

const userSchema = mongoose.Schema({ // Create the user schema for the database
   // name: { type: String, required: true },
   // job: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }

});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);