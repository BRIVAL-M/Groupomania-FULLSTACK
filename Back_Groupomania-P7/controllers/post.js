const Post = require('../models/Post'); // Import sauce model
const fs = require('fs');// Fs is required to delete the image from the folder when we delete the sauce


exports.createPost = (req, res, next) => { 
  // get url after blob/ in the imageUrl
 // const blob = req.url.split('/')[2]
 

//const imageUrl =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
//const imageUrl =  `${req.protocol}://${req.get('host')}/images/${blob}`;


//const imageUrl ="blob:http://localhost:3000/ed0adea1-e0f2-470f-8c09-c1a729ad5c3d"





  const { userId, name, title, content,usersLiked,date,imageUrl } = req.body;

  Post.create({//  MODIFIER ICI
    date,
    userId,
    name,
    title,
    content,
   imageUrl,
    likes: 0, // S ou pas s
     usersLiked // pas sur !!!!!!!!!!!!!
   
  })

    .then(() => {
      // enregistrer l'image dans le dossier images
      
    
console.log(req.body)
      

      res.status(201).json({ message: 'Post créé !' });
    })
    .catch(error => {
      // fs.unlink(req.file.path, () => { 
      //   res.status(500).json({ error });
      // });
      res.status(500).json({ error, message: 'Erreur lors de la création du post' });
     
      console.log(error)
    });
}

exports.modifyPost = (req, res, next) => { 

  const postObject = req.file ? 

    {
      ...JSON.parse(req.body.post),
    


     // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // 
    // imageUrl: req.file.path,

    } : { ...req.body }; 

  Post.findByIdAndUpdate({ _id: req.params.id }, { ...postObject, _id: req.params.id })

    .then(post => {

      if (req.file) {
        // const filename = post.imageUrl.split("/images/")[1]
        // fs.unlink(`images/${filename}`, () => {
        //   res.status(200).json({ message: 'Post modifié !' });
        // });
      } else {
        res.status(200).json({ message: 'Post modifié !' });
      }
    })
    .catch(error => res.status(500).json({ error }))
}


exports.deletePost = (req, res, next) => { 

  ///////////////////////////////////////////////////////


  //////////////////////////////////////////////////////

  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      ////////////////////////////////////////////

 
  ////////////////////////////////////////////////////    
      res.status(200).json({ message: 'Post supprimé !' });
      console.log(req.params.id)
   
    })
    .then(post => {
      
      // const filename = post.imageUrl.split("/images/")[1]
      // fs.unlink(`images/${filename}`, () => {
      //   res.status(200).json({ message: "Post supprimé" })
      // })
    })
    .catch(error => res.status(500).json({ error }))
}

exports.getOnePost = (req, res, next) => { // ------------------------------------------------------a delete
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}


//Post.deleteMany({}).then(() => console.log("Posts deleted ")); // Delete all posts in the database

//_______________________________________________ LIKE AND DISLIKE  

exports.likeAndDislike = (req, res, next) => { // LikeAndDislike is a function that adds or removes a like or dislike to the sauce with the id we receive
  let like = req.body.like
  let userId = req.body.userId
  let postId = req.params.id

  switch (like) { // Switch is used to add or remove a like or dislike
    case 1:// Case 1 is used to add a like
      Post.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }))

      break;// Break is used to stop the switch

    case 0: // Case 0 is used to remove a like
      Post.findOne({ _id: postId })
        .then((post) => {
          if (post.usersLiked.includes(userId)) {
            Post.updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
              .then(() => res.status(200).json({ message: `Neutre` }))
              .catch((error) => res.status(400).json({ error }))
          }
          if (post.usersDisliked.includes(userId)) {
            Post.updateOne({ _id: postId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
              .then(() => res.status(200).json({ message: `Neutre` }))
              .catch((error) => res.status(400).json({ error }))
          }
        })
        .catch((error) => res.status(404).json({ error }))
      break;

    case -1:// Case -1 is used to add a dislike
      Post.updateOne({ _id: postId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
        .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
        .catch((error) => res.status(400).json({ error }))
      break;

    default:// Default is used to remove a dislike

  }
}