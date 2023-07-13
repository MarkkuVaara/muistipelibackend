
const imagesRouter = require('express').Router();
const Image = require('../models/image');

imagesRouter.get('/', (req, res) => {

    Image.find({}).then(images=> {
        res.json(images);
    });

});

imagesRouter.get('/:id', (req, res, next) => {

    Image.findById(req.params.id)
        .then(image => {
            if (image) {
                res.json(image)
            } else {
                res.status(404).end()
            };
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        });

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
        console.log('Image saved!');
    });

    res.json(image);

});

imagesRouter.delete('/:id', (req, res, next) => {

    Image.findByIdAndDelete(req.params.id)
        .then(image => {
            if (image) {
                res.json(image)
            } else {
                res.status(404).end()
            };
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        });

});

imagesRouter.get('/info', (req, res) => {

    res.send('<h1>Simple muistipeli server</h1>');

});

module.exports = imagesRouter;
