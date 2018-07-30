const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const path = require('path');

// Use Morgan log generator
app.use(morgan('combined'));
app.use(bodyParser.json());

// Allow express to parse .json requests sent in
app.use(cors());

// Import .json from element
//import placement from './assets/element/placement.json';
//import simple from './assets/element/simple.json';
const placement = require('./assets/element/placement.json');
const simple = require('./assets/element/simple.json');
// Import .json from label
// import period from './assets/label/period.json';
// import group from './assets/label/group.json';
const period = require('./assets/label/period.json');
const group = require('./assets/label/group.json');

// Respond with "Hello World" on get request to the home page
// TODO: Convert functions below from ES5 to ES6 syntax
app.get('/', function(req, res) {
  res.send('Working')
});

app.get('/api/data/element/placement', function(req, res) {
  res.json(placement)
});

app.get('/api/data/element/simple', function(req, res) {
  res.json(simple)
});

app.get('/api/data/label/period', function(req, res) {
  res.json(period)
});

app.get('/api/data/label/group', function(req, res) {
  res.json(group)
});

// Catch-all request (if user goes to a URL that only the client can resolve (AKA vue-router),
// send the user the .html file, rather than trying to resolve the URL server-side

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});


app.post('/register', (req, res) => {
  res.send({
    message: `${req.body.email} was registered`
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Working.'));
