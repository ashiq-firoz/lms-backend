const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7h'
    });
}

router.post('/register', async (req, res) => {
    const { username, password, user_type } = req.body;
    const exsisting_user = await userModel.findOne({ username });
    if (exsisting_user) {
        return res.status(400).json('username already exists');
    }
    const user = await userModel.addUser(username, password, user_type);
    try {
        await user.save();
        const token = createToken(user);
        res.json({user, token});
    } catch(error) {
        res.status(400).json(error);
    }
});

const login = async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await userModel.login(username, password);
        const token = createToken(user);
        res.json({user, token});
    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

router.post('/login', login);

router.post('/adminlogin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.login(username, password);
        if (user.user_type === 'admin') {
            const token = await createToken(user);
            res.status(200).json({ user, token });
        } else {
            throw Error('incorrect user type');
        }
    } catch(error) {
        res.status(400).json({ message: error.message});
    }
});


module.exports = router;