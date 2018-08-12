const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/user.js');

app.use(morgan('short'));
app.use(express.static('./public'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(router);


app.listen(3000, () => {
    console.log('server is up');
});
 