
const imagesRouter = require('express').Router();
const Image = require('../models/image');

imagesRouter.get('/', (req, res) => {

    Image.find({}).then(images=> {
        res.json(images);
    });

});

imagesRouter.get('/:id', (req, res, next) => {

    const id = Number(req.params.id);

    const image = images.filter(image => image.id === id);

    res.json(image);

});

imagesRouter.post('/', (req, res) => {

    const body = req.body;

    if (body.image === undefined) {
      return res.status(400).json({ error: 'content missing' });
    }

    const image = new Image({
        image: body.image,
    });
      
    image.save().then(result => {
        console.log('Image saved!')
    });

    res.json(image);

});

imagesRouter.put('/', (req, res) => {

});

imagesRouter.delete('/:id', (req, res, next) => {

    const id = Number(req.params.id);

    images = images.filter(image => image.id !== id);

    res.status(200);

});

imagesRouter.get('/info', (req, res) => {

    res.send('<h1>Simple muistipeli server</h1>');

});

module.exports = imagesRouter;
