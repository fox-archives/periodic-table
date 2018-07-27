const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// Use Morgan log generator
app.use(morgan('combined'))

app.use(bodyParser.json())

// Allow express to parse .json requests sent in
app.use(cors())

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

app.post('/register', (req, res) => {
  res.send({
    message: `${req.body.email} was registered`
})
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Working.'))
