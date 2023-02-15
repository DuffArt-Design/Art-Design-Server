const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;


