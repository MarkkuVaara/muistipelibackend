const highscoresRouter = require('express').Router();
const Highscore = require('../models/highscore');

highscoresRouter.get('/', (req, res) => {

    Highscore.find({}).then(highscores=> {
        res.json(highscores);
    });

});

highscoresRouter.get('/:id', (req, res, next) => {

    Highscore.findById(req.params.id)
        .then(highscore => {
            if (highscore) {
                res.json(highscore)
            } else {
                res.status(404).end()
            };
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        });

});

highscoresRouter.post('/', (req, res) => {

    const body = req.body;

    if (body.score === undefined) {
      return res.status(400).json({ error: 'score missing' });
    }

    const highscore = new Highscore({
        name: body.name,
        score: body.score,
    });
      
    highscore.save().then(result => {
        console.log('Highscore saved!');
    });

    res.json(highscore);

});

highscoresRouter.delete('/:id', (req, res, next) => {

    Highscore.findByIdAndDelete(req.params.id)
        .then(highscore => {
            if (highscore) {
                res.json(highscore)
            } else {
                res.status(404).end()
            };
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        });

});

module.exports = highscoresRouter;
