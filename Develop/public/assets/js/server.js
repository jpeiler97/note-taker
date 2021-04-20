const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [];


app.get('/', (req, res) => res.sendFile(path.resolve('../../index.html')));
app.get('/notes', (req, res) => res.sendFile(path.resolve('../../notes.html')));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));