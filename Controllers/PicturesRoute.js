const Picture = require('../Models/picture');
const cloudinary = require('cloudinary').v2;
// eslint-disable-next-line no-unused-vars
// const cloudinaryConfig = cloudinary.config({
//   cloud_name: process.env.CLOUDNAME,
//   api_key: process.env.CLOUDAPIKEY,
//   api_secret: process.env.CLOUDINARYSECRET,
//   secure: true,
// });


async function createPicture(req, res, next) {
  try {
    const data = req.body;

    // Upload the image to Cloudinary and set the folder parameter
    const uploadResult = await cloudinary.uploader.upload(data.url, {
      folder: data.folder,
    });

    // Create a new picture object with the Cloudinary URL and other data
    const newPicture = await Picture.create({
      url: uploadResult.secure_url,
      id: uploadResult.public_id,
      name: data.name,
      description: data.description,
    });

    res.status(201).send(newPicture);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

async function getAllPictures(req, res, next) {
  try {
    const pictures = await Picture.find();
    res.status(200).send(pictures);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

async function getPicture(req, res, next) {
  try {
    const { id } = req.params;
    const picture = await Picture.findById(id);
    if (!picture) {
      res.status(404).send('Picture not found');
    } else {
      res.status(200).send(picture);
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

async function deletePicture(req, res, next) {
  try {
    const { id } = req.params;

    // Get the public ID of the picture from the database
    const picture = await Picture.findById(id);
    const publicId = picture.id;

    // Delete the asset from Cloudinary using the public ID
    await cloudinary.uploader.destroy(publicId);

    // Delete the picture from the database
    await Picture.findByIdAndDelete(id);

    res.status(204).end();
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

async function updatePicture(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedPicture = await Picture.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedPicture) {
      res.status(404).send('Picture not found');
    } else {
      res.status(200).send(updatedPicture);
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
}

module.exports = { createPicture, getAllPictures, getPicture, deletePicture, updatePicture };
