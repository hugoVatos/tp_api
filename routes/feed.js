const express = require('express');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post',feedController.createFootballeur);

router.get('/post/:postId', feedController.getPost);
router.delete('/deletePost/:deleteId', feedController.deletePost)
router.put('/updatePost/:updateId', feedController.updatePost)

module.exports = router;