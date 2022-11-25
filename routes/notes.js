const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');




// *************************** ROUTE 1 **************************

// Get all the notes of user using : GET "/api/notes/fetchall notes"   ***** LOgin Required ****

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

// Add notes of the user using  : GET "/api/notes/addnote notes"   ***** LOgin Required ****

router.post('/addnote', fetchuser, [

    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid Description').isLength({ min: 5 }),

], async (req, res) => {
    try {

        // destructuring se --> req.body ke andar ke data ko bahar nikalna 

        const { title, description, tag ,image} = req.body;

        //if there are errors then return bad requests and errors.

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({

            title, description, tag,image, user: req.user.id

        })

        const savedNote = await note.save()

        res.json(savedNote)
    }catch (error) {
        console.log(error.message);
        res.status(500).send("Interal Error Occured");
    }

})


// *************************** ROUTE 3 **************************

// Update the notes of the user using  : GET "/api/notes/updatenote notes"   ***** LOgin Required ****

// Here /:id / -->   is (particular note ID)  -->   req.params.id 

router.put('/updatenote/:id', fetchuser, [

    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Enter a valid Description').isLength({ min: 5 }),

], async (req, res) => {

    const { title, description, tag, image} = req.body;
    
    // create a new Note object 

    // if the title , description or tag is updated then update it to the new object newNote.

    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    if(image){newNote.image = image};

    // Find the note to be updated and update it 

    let note = await Note.findById(req.params.id);    // --> Found the note  

    if(!note){return res.status(404).send("Note Not Found")} // if note is not found , then return error

    if(note.user.toString() !== req.user.id){           // you cant update others notes
        return res.status(401).send("not allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id , {$set: newNote},{new:true})
    res.json(note);

})



module.exports = router;            // exporting the router


// Exporting in express is always done by 'module.exports'