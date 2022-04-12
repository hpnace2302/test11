const express = require('express');
const app = express();
var data = require('./data.json')
const bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());

app.get('/posts', function (req, res) {
  return res.json({result: data, count: data.length});
})

app.post('/posts', function (req, res) {
  data.splice(0 , 0, req.body.value )
  return res.status(200).send("Row Inserted")
})

app.delete('/posts/:id', function (req, res) {
  data = data.filter(x => x.id != req.params.id)
  return res.status(200).send("Row Deleted")
})

app.put('/posts/:id', function (req, res) {
  var index = data.findIndex(x => x.id === req.body.value.id)
  data.splice(index, 1, req.body.value)
  return res.status(200).send("Row Updated")
})

app.listen(8080)
