/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

const port = parseInt(process.env.PORT || '8080', 10);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
