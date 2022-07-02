const fs = require('fs');
const path = require('path');

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if(query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if(query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
}

// parses through to find the ID
function findById(id, notesarray) {
    const result = notesarray.filter(note => note.id === id)[0];
    return result;
}

// create a new note by adding the entry to the array and syncing the file
function createNewNote(body, notesArray) {
    let note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    // return code for post route
    return note;
}

// validation on the user entry
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }

    if(!note.text || typeof note.text !== 'string') {
        return false;
    }

    return true;
}

// export this file
module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
}