
const imagesRouter = require('express').Router();

let images = [
    {
        id: 1,
        image: 10001
    },
    {
        id: 2,
        image: 20202
    },
    {
        id: 3,
        image: 33335
    }
];

imagesRouter.get('/', (req, res) => {

    res.json(images);

});

imagesRouter.get('/:id', (req, res, next) => {

    const id = Number(req.params.id);

    const image = images.filter(image => image.id === id);

    res.json(image);

});

imagesRouter.get('/info', (req, res) => {

    res.send('<h1>Simple muistipeli server</h1>');

});

module.exports = imagesRouter;
