const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const PORT = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const clientPath = '../client';

app.use(express.static(path.join(__dirname, clientPath)));

app.get('/carousel', (req, res) => {                  // changed localhost to service path
  axios.get('http://carousel:2500/bundle.js')        // This is service path as specified in yml file
  .then(response => res.send(response.data))
  .catch((error) => (console.log('Error getting Carousel component')))
});


// AWS S3
// app.get('/carousel', (req, res) => {
//   axios.get('https://hrcarousel.s3-us-west-1.amazonaws.com/carousel-static/bundle.js')
//   .then(response => res.send(response.data))
// });

app.get('/checkout', (req, res) => {
  axios.get('http://checkout:2000/bundle.js')      // This is service path as specified in yml file
  .then(response => res.send(response.data))
  .catch((error) => (console.log('Error getting Checkout component')))
});

app.listen(PORT, () => console.log(`Server listening to PORT: ${PORT}`))
