const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require("body-parser");
const homeRoutes = require('./routes/home');

const app = express();


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(homeRoutes.routes);


app.listen(3000, () => console.log('App is listening on url http://localhost:3000'));