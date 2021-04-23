const express = require('express');
const path = require('path');
const fs = require('fs');
let noteData = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3001;

let notes = noteData;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', function(err, data) {
        try {
            res.json(JSON.parse(data));
        } catch(err) {
            res.json([]);
        }
    })
});
app.get('/api/notes/:id', (req, res) => {
	const chosen = req.params.id;

	for (let i = 0; i < notes.length; i++) {
		if (chosen === (notes[i].id).toString()) {
			return res.json(notes[i]);
		}
	}
    return res.json(false);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    for(i = 0; i < notes.length; i++){
        notes[i].id = i.toString();
    }
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
    err ? console.log(err) : console.log('success'));
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;
    for(i = 0; i < notes.length; i++){
        if(chosen === notes[i].id){
        notes.splice(i, 1);
    }
}
    for(i = 0; i < notes.length; i++){
        notes[i].id = i.toString();
    }
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) =>
    err ? console.log(err) : console.log('success'));
    res.json(notes);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));