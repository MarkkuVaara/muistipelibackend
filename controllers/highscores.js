const highscoresRouter = require('express').Router();
const Highscore = require('../models/highscore');

highscoresRouter.get('/', async (req, res) => {

    const highscores = await Highscore.find({});
    
    res.json(highscores);

});

highscoresRouter.get('/:id', async (req, res, next) => {

    const highscore = await Highscore.findById(req.params.id);

    res.json(highscore);

});

highscoresRouter.post('/', async (req, res) => {

    const body = req.body;

    if (body.score === undefined || body.name === undefined || body.level === undefined) {
      return res.status(400).json({ error: 'score, name or level missing' });
    }

    const highscore = new Highscore({
        name: body.name,
        score: body.score,
        level: body.level
    });

    const savedHighscore = await highscore.save();

    console.log('Highscore saved!');
    res.json(savedHighscore);

});

highscoresRouter.delete('/:id', async (req, res, next) => {

    await Highscore.findByIdAndDelete(req.params.id);

    res.status(204).end();

});

module.exports = highscoresRouter;
