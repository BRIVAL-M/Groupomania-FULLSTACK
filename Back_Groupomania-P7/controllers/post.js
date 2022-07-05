const Post = require('../models/Post');
const fs = require('fs');
const User = require('../models/User');



exports.createPost = async (req, res, next) => { //___________________ Create a new post

  const newPost = new Post({

    userId: req.body.userId,
    name: req.body.name,
    date: req.body.date,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file !== undefined ? `http://localhost:8080/images/${req.file.filename}` : '',

    likes: 0,
    usersLiked: [],
  })

  try {

    const post = await newPost.save();
    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).send(error)
  }
}

exports.modifyPost = (req, res, next) => { //___________________ Modify a post
  User.findOne({ _id: req.auth.userId })
    .then(user => {
      Post.findOne({ _id: req.params.id })
        .then(post => {

          if (post.userId == user._id || user.role == "admin") {
            const postObject = req.file ?
              {
                title: req.body.title,
                content: req.body.content,
                imageUrl: req.file !== undefined ? `http://localhost:8080/images/${req.file.filename}` : '',
              } : { ...req.body };

            Post.findByIdAndUpdate({ _id: req.params.id }, { ...postObject, })

              .then(post => {

                if (req.file) {
                  const filename = post.imageUrl.split("/images/")[1]
                  fs.unlink(`images/${filename}`, () => {
                    res.status(200).json({ message: 'Post modifié !' });
                  });
                }
              })
              .catch(error => res.status(400).json({ error }));
          } else {
            res.status(401).json({ message: 'Vous n\'avez pas le droit de modifier ce post' })
          }
        }
        )
    }
    )
}

exports.deletePost = (req, res, next) => {//______________________ Delete a post
  console.log("test: " + req.auth.userId)
  User.findOne({ _id: req.auth.userId })
    .then(user => {
      console.log("user: " + user)

      console.log("req.bodyUserId =", req.body.userId)
      Post.findOne({ _id: req.params.id })
        .then(post => {
          console.log("post: " + post, "user: " + req.params.id)
          if (post.userId == user._id || user.role == "admin") {

            const filename = post.imageUrl.split("/images/")[1]

            fs.unlink(`images/${filename}`, () => {
              Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                .catch((error) => res.status(400).json({ error }))
            });
          } else {
            res.status(401).json({ message: 'Vous n\'avez pas le droit de supprimer ce post' })
          }
        }
        )
        .catch(error => res.status(500).json({ error }))
    }
    )
}

exports.getOnePost = (req, res, next) => {//________________ Get one post
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

exports.getAllPosts = (req, res, next) => {//___________________ Get all posts
  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

exports.likeAndDislike = (req, res, next) => {// ___________________ Like and a post
  let like = req.body.like
  let userId = req.body.userId
  let postId = req.params.id

  switch (like) { // Switch is used to add or remove a like or dislike
    case 1:// Case 1 is used to add a like
      Post.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }))


    ////////////////////////////////////////////////////////////__________________________ COMING SOON

    //  break;// Break is used to stop the switch

    // case 0: // Case 0 is used to remove a like
    //   Post.findOne({ _id: postId })
    //     .then((post) => {
    //       if (post.usersLiked.includes(userId)) {
    //         Post.updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
    //           .then(() => res.status(200).json({ message: `Neutre` }))
    //           .catch((error) => res.status(400).json({ error }))
    //       }
    //   if (post.usersDisliked.includes(userId)) {
    //     Post.updateOne({ _id: postId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
    //       .then(() => res.status(200).json({ message: `Neutre` }))
    //       .catch((error) => res.status(400).json({ error }))
    //   }
    // })
    // .catch((error) => res.status(404).json({ error }))
    // break;

    // case -1:// Case -1 is used to add a dislike
    //   Post.updateOne({ _id: postId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
    //     .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
    //     .catch((error) => res.status(400).json({ error }))
    //   break;

    // default:// Default is used to remove a dislike

  }
}

//Post.deleteMany({}).then(() => console.log("Posts deleted ")); // Delete all posts in the database