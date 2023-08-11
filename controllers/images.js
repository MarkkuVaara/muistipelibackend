
const imagesRouter = require('express').Router();
const Image = require('../models/image');

imagesRouter.get('/', async (req, res) => {

    const images = await Image.find({});
    
    res.json(images);

});

imagesRouter.get('/:id', async (req, res, next) => {

    const image = await Image.findById(req.params.id);

    res.json(image);

});

imagesRouter.post('/', async (req, res) => {

    const body = req.body;

    if (body.image === undefined) {
      return res.status(400).json({ error: 'content missing' });
    }

    const image = new Image({
        image: body.image,
    });

    const savedImage = await image.save();

    console.log("Image saved!");
    res.json(savedImage);

});

imagesRouter.delete('/:id', async (req, res, next) => {

    const deletedImage = await Image.findByIdAndDelete(req.params.id);

    console.log('Image deleted!');
    res.json(deletedImage);

});

module.exports = imagesRouter;
