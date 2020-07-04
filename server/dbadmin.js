const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const auth = require('./routes/auth');
const port = 4003 || process.env.PORT;

app.use(express.json());

app.use('/auth', auth);

app.listen(port, () => console.log('dbadmin running'));