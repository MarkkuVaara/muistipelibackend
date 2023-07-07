
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const imageSchema = new mongoose.Schema({
    id: number,
    image: number,
});

imageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Image', imageSchema);
