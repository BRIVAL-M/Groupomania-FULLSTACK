
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

  userId: { type: String, required: true },
    name: {
     type: String,
  // //   //required: true,
  // //    //maxlength: 30,
  // //   // minlength: 3,
   },
  title: {
    type: String,
   // required: true,
     maxlength: 100,
     // minlength: 1,
  },
  content: {
    type: String,
    required: true,
     maxlength: 1000,
     minlength: 1,
  },

 imageUrl: { type: String,  },

  likes: { type: Number, required: true },
 
 usersLiked: { type: [String], required: true },

 date: { type: String, required: true}
 
});

module.exports = mongoose.model('POST DATA', postSchema);