const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Setup
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Basic Get
app.post('/register', (req, res) => {
    res.send({
        message: `Hello ${req.body.email}. Your user was registered! Have fun!`
    });
});

// Make App Accessible. 
app.listen(process.env.PORT || 8081);