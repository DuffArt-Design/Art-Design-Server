require('dotenv').config();
const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2;


// eslint-disable-next-line no-unused-vars
const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

const cors = require('cors');
app.use(cors());


// HOW TO UPLOAD //////////////////////////////////////////////////////////////////////////

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: 'olympic_flag'});
// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });
// // Generate 
// const url = cloudinary.url('olympic_flag', {
//   width: 100,
//   height: 150,
//   Crop: 'fill',
// });
// console.log(url);

// HOW TO GRAB ALL ///////////////////////////////////////////////////////////


app.get('/photos', (req, res) => {
  cloudinary.api.resources({ max_results: 100 })
    .then(result => {
      console.log(`Received photos`);
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      console.error(`Error fetching photos`);
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});



app.get('/folder', (req, res) => {
  cloudinary.api.root_folders()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
