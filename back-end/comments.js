const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// import users
const users = require('./users.js');
const User = users.model;
const validUser = users.valid;

// import photos
const photos = require('./photos.js');
const Photo = photos.model;

// comment schema
const commentShema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    photo: {
        type:mongoose.Schema.ObjectId,
        ref: 'Photo'
    },
    comment: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// comment model
const Comment = mongoose.model('Comment', commentShema);

// create comment
router.post('/:id', validUser, async (req, res) => {
    try {
        const comment = new Comment({
            comment: req.body.comment,
            photo: req.body.photo,
            user: req.user
        });
        await comment.save();
    } catch (error) {
        // console.log(error);
        return res.sendStatus(500);
    }
});

// get comments
router.get('/:id', async (req, res) => {
    try {
        let comments = await Comment.find({  photo: req.params.id  }).sort({  created: -1  }).populate('user');
        return res.send(comments);
    } catch (error) {
        // console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Comment
}