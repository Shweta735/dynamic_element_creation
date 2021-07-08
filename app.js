const express = require('express');
const bodyParser = require('body-parser');
const elementRoutes = require('./route/elementroutes');
const db = require('./db/database');
const app = express();
// db.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// app.set('views', `${__dirname}/public/views`);
// app.set('view engine', 'ejs');

// app.use(express.static(`${__dirname}/public`));


app.get('/', (req, res) => {
  res.render('index')
});

const basePath = '/api/v1';

app.use(`${basePath}/element`,elementRoutes)


// Handle User Generated 404 errors. ******** MUST BE THE LAST ROUTE *******
app.use((req, res) => res.status(404).send('Not Found'));

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('jnj')
  db.end();
  console.log(`Caught exception: ${err}`);
});

app.listen(process.env.PORT || 5000, ()=> console.log('connected'))
