const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const port = 3000;


const path = __dirname + '/views/';
const app = express();

app.use(express.static(path));
app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req,res) {
  console.log('get!')
  res.sendFile(path + "index.html");
});

app.post('/save', (req, res) => {
  console.log(req.body)
  res.status(200).send('POST request to the homepage')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})