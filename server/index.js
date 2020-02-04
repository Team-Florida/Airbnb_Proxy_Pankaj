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

app.get('/carousel', (req, res) => {
  console.log('First')
  axios.get('http://localhost:2500/bundle.js')
  .then(response => res.send(response.data))
})

app.listen(PORT, () => console.log(`Server listening to PORT: ${PORT}`))
