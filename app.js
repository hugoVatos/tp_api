const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
//mongodb+srv://sylarox:hugo1999a@cluster0.0cvxasc.mongodb.net/test


mongoose.connect('mongodb+srv://sylarox:hugo1999a@cluster0.0cvxasc.mongodb.net/test')
    .then(result => {
        app.listen(8080);
        console.log('connected successfully')
    })
    .catch(err => console.log(err));
