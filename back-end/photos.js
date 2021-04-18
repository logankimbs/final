const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

// import user
const users = require('./users.js');
const User = users.model;
const validUser = users.valid;

const router = express.Router();

const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 50000000
    }
});

// photo schema
const photoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    path: String,
    title: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// photo model
const Photo = mongoose.model('Photo', photoSchema);

// upload photo
router.post('/', validUser, upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            message: "file is required"
        });
    } else {
        const photo = new Photo({
            user: req.user,
            path: '/images/' + req.file.filename,
            title: req.body.title,
            description: req.body.description
        });
        try {
            await photo.save();
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    }
});

// get current users photos
router.get('/', validUser, async (req, res) => {
    try {
        let photos = await Photo.find({  user: req.user  }).sort({  created: -1  }).populate('user');
        return res.send(photos);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all photos
router.get('/all', async (req, res) => {
    try {
        let photos = await Photo.find().sort({  created: -1  }).populate('user');
        return res.send(photos);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get photo
router.get('/:id', async (req, res) => {
    try {
        let photo = await Photo.findOne({_id: req.params.id}).sort({
            created: -1
        }).populate('user');
        return res.send(photo);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Photo
}