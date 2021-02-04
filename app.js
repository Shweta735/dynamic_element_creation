const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const attributeRoutes = require('./route/attributeroutes');
const db = require('./db/database');
const app = express();
db.init();


// mongoose.connect('mongodb://shweta123:shweta123@ds255728.mlab.com:55728/mern_shopping');
// mongoose.Promise = global.Promise;

// const db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'html/index.html'));
});

const basePath = '/api/v1';

app.use(`${basePath}/attribute`,attributeRoutes)


app.listen(8000, ()=> console.log('connected'))
