const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');


const app = express();
const PORT = process.env.PORT || 3001;

// link to static assets
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming json data
app.use(express.json());

// when it starts it should open to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// when the user clicks the notes button send them to that page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});