const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

const noteSchema = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')


//Get the all notes

router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await noteSchema.find({ user: req.user.id }) 
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Somthing went wrong")
    }
})

//Add a new note

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const response = await noteSchema.create({
                title, description, user: req.user.id
            })
            if (response) {
                res.json({ success: true, msg: "Note saved successfully" })
            } else {
                res.json({ success: false, msg: "Your note not saved" })
            }

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Somthing went wrong")
        }
    })

//Update an existing note

router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }

            let note = await noteSchema.findById(req.params.id);
            if (!note) { res.status(404).send("Note found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }
            note = await noteSchema.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note)

        } catch (error) {
            console.error(error.message)
            res.status(500).send("Somthing went wrong")
        }
    })

//Delete a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note to be delete
        let note = await noteSchema.findById(req.params.id);
        if (!note) { return res.status(404).send("Note found") }

        //Allow deletion if only user own this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        await noteSchema.findByIdAndDelete(req.params.id)
        res.json({ Success: "Note has been deleted" })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Somthing went wrong")
    }
})




module.exports = router