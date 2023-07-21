
const mongoose = require('mongoose');

const highscoreSchema = new mongoose.Schema({
    name: String,
    score: Number
});

highscoreSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Highscore', highscoreSchema);