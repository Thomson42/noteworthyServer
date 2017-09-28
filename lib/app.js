const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
const createAuth = require('./auth/ensure-auth');



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));
const ensureAuth = createAuth();

const auth = require('./routes/auth');
const me = require('./routes/me');
const notes = require('./routes/notes');
const folders = require('./routes/folders');

app.use('/api/auth', auth);
app.use('/api/me', ensureAuth, me);
app.use('/api/folders',ensureAuth, folders);
app.use('/api/notes',ensureAuth, notes);


app.use(errorHandler());

module.exports = app;