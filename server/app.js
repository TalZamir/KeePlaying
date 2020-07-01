require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middlewares 
app.use(cors());
app.use(bodyParser.json());

// Routes
const songsRoute = require('./routes/songs');
app.use('/songs', songsRoute);


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to DB Successfully'),
        err => console.log(err)
    );

// Run server
app.listen(3300);

