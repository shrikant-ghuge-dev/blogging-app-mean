require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/auth')

// To read the body from the requests
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ message: "test" })
})

app.use('/api/v1/auth', authRoute)

app.listen(process.env.PORT);

