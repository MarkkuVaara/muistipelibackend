
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', (req, res) => {

    User.find({}).then(users=> {
        res.json(users);
    });

});

usersRouter.get('/:id', (req, res, next) => {

    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).end()
            };
        })
        .catch(error => next(error));

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

    user.save().then(result => {
        console.log('User saved!');
    });

    res.json(user);

});

usersRouter.delete('/:id', (req, res, next) => {

    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).end()
            };
        })
        .catch(error => next(error));

});

module.exports = usersRouter;