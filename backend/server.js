const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cors = require('cors');
// app.use(cors());
const path = require('path');

const app = express();
app.use(bodyParser.json()); // Allow express to parse .json requests sent in
app.use(morgan('combined')); // Use Morgan log generator

// app.use(express.static('public')); // This replaces the bottom two lines
app.use('/old', express.static(path.join(__dirname, 'public/old')));
app.use('/element-data', express.static(path.join(__dirname, 'public/element-data')));

// Respond with 'Working' on get request to the home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

// Catch-all request (if user goes to a URL that only the client can resolve (AKA vue-router),
// send the user the .html file, rather than trying to resolve the URL server-side
// If this is disabled, would get something like 'Cannot GET /orbitals, if client navigates to /orbitals tab'
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Working'));
