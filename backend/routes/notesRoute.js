const express = require("express");
const router = express.Router();
const wrapasync = require("../utils");
const { getNotes,addNotes,deleteNote,deleteAllNotes }= require("../controllers/notesController");

//route for getting all notes
router.get("/",wrapasync(getNotes));

//route for adding a new note
router.post("/",wrapasync(addNotes));

//route for deleting a note
router.delete("/delete/:id",wrapasync(deleteNote));

//route for deleting all notes
router.delete("/delete",wrapasync(deleteAllNotes));

module.exports = router;