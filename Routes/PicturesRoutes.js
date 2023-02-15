const express = require('express');
const { createPicture, getAllPictures, getPicture, updatePicture, deletePicture } = require('../Controllers/PicturesRoute');

const pictureRouter = express.Router();

pictureRouter.route('/pictures')
  .post(createPicture)
  .get(getAllPictures);

pictureRouter.route('/pictures/:id')
  .get(getPicture)
  .put(updatePicture)
  .delete(deletePicture);

module.exports = pictureRouter;
