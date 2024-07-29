const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.get('/', (req, res) => {
    res.send('Hello world :)');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})