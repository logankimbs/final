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

module.exports = {
    routes: router,
    model: Comment
}