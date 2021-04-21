const express = require('express');
const path = require('path');
const fs = require('fs');
var appDir = path.dirname(require.main.filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(path.resolve('../../../db/db.json'));
let noteData = fs.readFileSync(path.resolve('../../../db/db.json'));
let notes = JSON.parse(noteData);



app.get('/', (req, res) => res.sendFile(path.resolve('../../index.html')));
app.get('/notes', (req, res) => res.sendFile(path.resolve('../../notes.html')));
app.get('/api/notes', (req, res) => res.json(notes))

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    res.json(newNote);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));