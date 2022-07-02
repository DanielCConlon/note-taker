const notes = require('../../db/db.json');
const fs = require('fs');
const router = require('express').Router();

// helper method for getting unique ids
const uuid = require('../../helpers/uuid');

const { 
    filterByQuery,
    findById,
    createNewNote,
    validateNote
 } = require('../../lib/notes');

// generate unique ids


router.get('/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if(result) {
        res.json(result);
    }
    else{
        res.send(404);
    }
});


// create a new note
router.post('/notes', (req, res) =>{
    req.body.id = uuid;

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