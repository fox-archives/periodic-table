const express = require('express')
const app = express()

// Respond with "Hello World" on get request to the home page
app.get('/', function(req, res) {
  res.send('Hello World')
})

app.listen(3000, () => console.log('Example App'))
