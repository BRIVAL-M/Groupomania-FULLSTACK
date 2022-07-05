
const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post'); 
const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 




router.post('/',auth,multer.single("image"),postCtrl.createPost); // Create a new post

router.put('/:id', auth,multer.single("image"), postCtrl.modifyPost); // Upload the image and modify the post

router.delete('/:id', auth, postCtrl.deletePost); // Delete the post

router.get('/:id', auth, postCtrl.getOnePost); // Get the post from the id

router.get('/', auth, postCtrl.getAllPosts); // Get all posts

router.post("/:id/like", auth, postCtrl.likeAndDislike) // Add a like to the post



module.exports = router;
