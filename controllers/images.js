
const imagesRouter = require('express').Router();

let images = [
    1000, 1001, 1002
];

imagesRouter.get('/', (req, res) => {
    res.json(images);
});

imagesRouter.get('/info', (req, res) => {
    res.send('<h1>Simple muistipeli server</h1>')
});

module.exports = imagesRouter;
