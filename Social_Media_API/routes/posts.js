const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../models/posts');

router.post(
  '/posts',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: 'Invalid inputs' });
    }

    try {
      // Create a new post
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id,
      });

      // Save the post to the database
      await post.save();

      // Return the new post object
      res.json({
        id: post.id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//DELETE a post by ID
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    // Find the post by ID and verify if, it was created by the authenticated user
    const post = await Post.findOne({ _id: req.params.id, author: req.user.id });

    if (!post) {
      return res.status(404).json({ message: 'Post not Found' });
    }

    //Delete the post and its associated comments
    await Post.deleteOne({ _id: req.params.id });

    res.status(204).end();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
