let notes = require('../../db/db.json');
const fs = require('fs');
const router = require('express').Router();

// helper method for getting unique ids
const uuid = require('../../helpers/uuid');
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
} =  require('../../lib/notes');
const { json } = require('express');


// generate unique ids

// route for notes
router.get('/notes', (req, res) => {
    let results = notes;

    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);

});

// create a new note
router.post('notes', (req, res) => {
    req.body.id = uuid;

    notes.push(req.body);

    writeToFile('./db/db.json').then((data) => {
        res.json(notes);
    });
});

// delete a note
router.delete('/notes/:id', (req, res) => {

    const result = findById(req.params.id, notes);

    if(result){
        var oldNotes = notes;
        let filteredNotes = oldNotes.filter((note) => note.id !== req.params.id);

        fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));
        notes = filteredNotes;
        res.json(filteredNotes);
    }
});


// create a new note
router.post('/notes', (req, res) =>{
    req.body.id = uuid();

    // if any data is incorrect, send 400 error back
    if(!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    }
    else {
        const newNote = createNewNote(req.body, notes);
        res.json(newNote);
    }
});




module.exports = router;