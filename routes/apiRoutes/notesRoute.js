const notes = require('../../db/db.json');
const fs = require('fs');
const router = require('express').Router();

// helper method for getting unique ids
const uuid = require('../../helpers/uuid');
const { readAndAppend, readFromFile, writeToFile } = require ('../../helpers/utils');


// generate unique ids

// route for notes
router.get('/notes', (req, res) => {
    readFromFile("./db/db.json").then((data)=>
    res.json(JSON.parse(data))
    );
});

// create a new note
router.post('notes', (req, res) => {
    req.body.id = uuid;

    notes.push(req.body);

    writeToFile('./db/db.json').then((data) => {
        res.json(notes);
    });
});

// router.get('/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);

//     if(result) {
//         res.json(result);
//     }
//     else{
//         res.send(404);
//     }
// });

// router.delete('/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);

//     if(result){
//         var oldNotes = notes;
//         let filteredNotes = oldNotes.filter((note) => note.id !== req.params.id);
//         console.log(filteredNotes);

//         fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));
//         notes = filteredNotes;
//         res.json(filteredNotes);
//     }
// });

// // create a new note
// router.post('/notes', (req, res) =>{
//     req.body.id = uuid;

//     // if any data is incorrect, send 400 error back
//     if(!validateNote(req.body)) {
//         res.status(400).send('The note is not properly formatted.')
//     }
//     else {
//         const newNote = createNewNote(req.body, notes);
//         res.json(newNote);
//     }
// });




module.exports = router;