const express = require('express')
const app = express()

const elementPlacement = require('./assets/elementPlacement.json')
const groupPeriodLabels = require('./assets/groupPeriodLabels.json')
const main = require('./assets/main.json')

// Respond with "Hello World" on get request to the home page
app.get('/', function(req, res) {
  res.send('Working')
})

app.get('/api/elementPlacement', function(req, res) {
  res.json(elementPlacement)
})

app.get('/api/groupPeriodLabels', function(req, res) {
  res.send(groupPeriodLabels)
})

app.get('/api/main', function(req, res) {
  res.send(main)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Working.'))
