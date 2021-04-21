const express = require('express');
const path = require('path');
const fs = require('fs');
let noteData = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.resolve(__dirname, './public/notes.html')));
app.get('/api/notes', (req, res) => res.json(noteData))

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    res.json(newNote);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));