const express = require('express');
const mongoose = require('mongoose');
const argon2 = require('argon2');

const router = express.Router();

// user schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
});

// hash and salt password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {  return next();  }
    try {
        const hash = await argon2.hash(this.password);
        this.password = hash;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// compare password
userSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await argon2.verify(this.password, password);
        return isMatch;
    } catch (error) {  return false;  }
};

// delete password hash from object
userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

// user model
const User = mongoose.model('User', userSchema);

const validUser = async (req, res, next) => {
    if (!req.session.userID) {
        return res.status(403).send({
            message: "user was not logged in"
        });
    }
    try {
        const user = await User.findOne({  _id: req.session.userID  });
        if (!user) {
            return res.status(403).send({
                message: "user was not logged in"
            });
        }
        req.user = user;
    } catch (error) {
        return res.status(403).send({
            message: "user was not logged in"
        });
    }
    next();
};

// create user
router.post('/', async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "form is incomplete"
        });
    }
    try {
        const existingUser = await User.findOne({  username: req.body.username  });
        if (existingUser) {
            return res.status(403).send({
                message: "user already exists"
            });
        } else {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password
            });
            await user.save();
            req.session.userID = user._id;
            return res.send({  user: user  });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// login user
router.post('/login', async (req, res) => {
    if (!req.body.username || !req.body.password) {  return res.sendStatus(400);  }
    try {
        const user = await User.findOne({  username: req.body.username  });
        if (!user) {
            return res.status(403).send({
                message: "username is incorrect"
            });
        } else if (!await user.comparePassword(req.body.password)) {
            return res.status(403).send({
                message: "password is incorrect"
            })
        } else {
            req.session.userID = user._id;
            return res.send({  user: user  });
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get current user
router.get('/', validUser, async (req, res) => {
    try {
        res.send({  user: req.user  });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// logout user
router.delete('/', validUser, async (req, res) => {
    try {
        req.session = null;
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: User,
    valid: validUser
};