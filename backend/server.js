const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const path = require('path');

// Use Morgan log generator
app.use(morgan('combined'));

// Allow express to parse .json requests sent in
app.use(bodyParser.json());

//app.use(cors());

// Import .json from element
const color = require('./assets/element/color.json');
const discovered = require('./assets/element/discovered.json');
const placement = require('./assets/element/placement.json');
const simple = require('./assets/element/simple.json');

// Import .json from label
const period = require('./assets/label/period.json');
const group = require('./assets/label/group.json');


// Respond with "Hello World" on get request to the home page
// TODO: Convert functions below from ES5 to ES6 syntax
app.get('/', function(req, res) {
  res.send('Working')
});

// TODO: Add favicon and make server sends favicon on request
app.get('/favicon.ico', function(req, res) {

});

// Element Information
app.get('/api/data/element/color', function(req, res) {
  res.json(color)
});

app.get('/api/data/element/discovered.json', function(req, res) {
  res.json(discovered)
});

app.get('/api/data/element/placement', function(req, res) {
  res.json(placement)
});

app.get('/api/data/element/simple', function(req, res) {
  res.json(simple)
});

// Period / Group Labels
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

// Some unimplemented registration route
app.post('/register', (req, res) => {
  res.send({
    message: `${req.body.email} was registered`
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Working'));
