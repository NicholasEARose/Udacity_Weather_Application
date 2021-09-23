//set global var
//from this Udacity lesson: 'Exercise: Server Set-up'
let projectData = {};

//package/dependencies
//from this Udacity lesson: 'Exercise: Server Set-up'
const express = require('express');
const bodyParser = require('body-parser');

//express set up
//from this Udacity lesson: 'Exercise: Server Set-up'
const app = express();
//Middleware deprecated... alt?
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS setup
//from this Udacity lesson: 'Exercise: Server Set-up'
const cors = require('cors');
app.use(cors());
//from this Udacity lesson: 'Exercise: Server Set-up'
//fun little rabbit hole https://expressjs.com/en/starter/static-files.html
app.use(express.static('website'));

//from this Udacity lesson: 'Exercise: GET requests'
app.get('/all', getInfo);
function getInfo(req, res) {
  res.send(projectData);
}

//from this Udacity lesson: 'Exercise: POST requests'
//had to pull in from POST and put it into projectData only change, modified code from directly below
// const data = [];
// app.post('/animal', addAnimal);
// function addAnimal (req,res){
//   data.push(req.body); i had to break this into three parts for each and push it into projectData vars
// };
app.post('/add', addInfo);
function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

//from this Udacity lesson: 'Exercise: Server Set-up'
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log(server);
  console.log(`running on localhost: ${port}`);
};
