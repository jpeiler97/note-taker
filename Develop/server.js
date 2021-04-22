const express = require('express');
const path = require('path');
const fs = require('fs');
let noteData = require('./db/db.json');
console.log("Note data from file: ", noteData);
const app = express();
const PORT = process.env.PORT || 3001;

let notes = noteData;

console.log("notes = noteData: ", notes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notes.length + 1;
    notes.push(newNote);
    console.log("New note: ", newNote);
    console.log("notes after pushing newNote: ", notes);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
    err ? console.log(err) : console.log('success'));
    res.json(newNote);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));