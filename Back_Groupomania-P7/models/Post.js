
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

  userId: { type: String, required: true },
  //  name: {
  //    type: String,
  // //   //required: true,
  // //    //maxlength: 30,
  // //   // minlength: 3,
  // },
  title: {
    type: String,
    required: true,
     maxlength: 100,
      minlength: 3,
  },
  content: {
    type: String,
    required: true,
     maxlength: 100,
     minlength: 3,
  },

 // imageUrl: { type: String,  },

 // likes: { type: Number, required: true },
 
 // usersLiked: { type: [String], required: true },
 
});

module.exports = mongoose.model('POST DATA', postSchema);