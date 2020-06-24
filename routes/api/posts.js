const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Create a post
// @access  Private

router.post(
  '/',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');

    try {
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Get api/posts
// @desc    Get all posts
// @access  Private
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', [auth], async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    console.log(error);

    res.status(500).send('Server Error');
  }
});

// @route   Delete api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', [auth], async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    console.log(error);

    res.status(500).send('Server Error');
  }
});

// @route   Put api/posts/like/:id
// @desc    Like a post
// @access  Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const post = await Post.findById(req.params.id);
    const { likes } = post;

    // Check if the post has already been liked
    if (likes.some((like) => like.user.toString() === req.params.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    likes.unshift({ user: req.params.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   Put api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const post = await Post.findById(req.params.id);
    const { likes } = post;

    // Check if the post has already been liked
    if (!likes.some((like) => like.user.toString() === req.params.id)) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    post.likes = likes.filter((like) => like.user.toString() !== req.params.id);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   Post api/posts/comment/:id
// @desc    Comment a post
// @access  Private

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    try {
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Delete Comment from a post
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const { comments } = post;

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post.comments = comments.filter(({ id }) => id !== req.params.comment_id);

    await post.save();

    return res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
