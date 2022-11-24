const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');




// *************************** ROUTE 1 **************************

// Get all the notes of user using : GET "/api/auth/fetchall notes"   ***** LOgin Required ****

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    // this is for verifying that the notes belong to the specific user only by verifying the user ID
    //Bascially getting the user id

    try {
        const notes = await Note.find({ user: req.user.id })         
        res.json(notes)
        
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Interal Error Occured");
    }
})

// *************************** ROUTE 2 **************************

// Get all the notes of user using : GET "/api/auth/addnote notes"   ***** LOgin Required ****

router.post('/addnote', fetchuser, [

    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid Description').isLength({ min: 5 }),

], async (req, res) => {
    try {

        // destructuring se --> req.body ke andar ke data ko bahar nikalna 

        const { title, description, tag } = req.body;

        //if there are errors then return bad requests and errors.

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({

            title, description, tag, user: req.user.id

        })

        const savedNote = await note.save()

        res.json(savedNote)
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Interal Error Occured");
    }

})

module.exports = router;            // exporting the router


// Exporting in express is always done by 'module.exports'