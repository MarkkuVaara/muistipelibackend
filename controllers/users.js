
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {

    const users = await User.find({});
    
    res.json(users);

});

usersRouter.get('/:id', async (req, res, next) => {

    const user = await User.findById(req.params.id);

    res.json(user);

});

usersRouter.post('/', async (req, res) => {

    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    if (body.username === undefined) {
      return res.status(400).json({ error: 'username missing' });
    }

    const user = new User({
        username: body.username,
        passwordHash: passwordHash,
    });

    const savedUser = await user.save();
    console.log('User saved!');

    res.json(savedUser);

});

usersRouter.delete('/:id', async (req, res, next) => {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    console.log('User deleted!');
    res.json(deletedUser);

});

module.exports = usersRouter;