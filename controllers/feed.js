const { validationResult } = require('express-validator/check');

const Post = require('../models/post');
const {body} = require("express-validator");

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                name: 'Cristiano Ronaldo',
                height: '1,88',
                image: 'images/duck.jpg',
                poste: 'BU',

                creator: {
                    name: 'Sciences-u'
                },
                createdAt: new Date()
            }
        ]
    });
};


exports.createFootballeur = (req, res, next) => {
    console.log('I\'m here');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        });
    }
    console.log('my body logged: ', req.body)
    const name = req.body.name;
    const height = req.body.height;
    const image = req.body.image;
    const poste = req.body.poste;

    const post = new Post({
        name: name,
        height: height,
        image: image,
        poste: poste,
        creator: { name: 'Sciences-u' }
    });
    post
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: result
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Post fetched.', post: post });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePost = (req, res, next) => {
    const deleteId = req.params.deleteId;
    Post.findByIdAndDelete(deleteId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'Post deleted.', post: post });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.updatePost = (req, res, next) => {
    const updateId = req.params.updateId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const name = req.body.name;
    const height = req.body.height;
    const poste = req.body.poste;
    let image = req.body.image;
    if (req.file) {
        image = req.file.path;
    }
    if (!image) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    Post.findById(updateId)
        .then(post => {
            if (!post) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            if (image !== post.image) {
                clearImage(post.image);
            }
            post.name = name;
            post.image = image;
            post.height = height;
            post.poste = poste;
            return post.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Post updated!', post: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};