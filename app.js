const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const elementRoutes = require('./route/elementroutes');
const db = require('./db/database');
const app = express();
db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'html/index.html'));
});

const basePath = '/api/v1';

app.use(`${basePath}/element`,elementRoutes)


app.listen(8000, ()=> console.log('connected'))
