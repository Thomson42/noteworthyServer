const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

const notes = require('./routes/notes');
const folders = require('./routes/folders');


//app.use('/api/notes', notes);
app.use('/api/folders', folders);


app.use((req, res) => {
    res.sendFile('index.html', {
        root: './public/',
    });
});

app.use(errorHandler());

module.exports = app;