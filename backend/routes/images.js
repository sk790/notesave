const express = require('express')
const router = express.Router()
const ImageSchema = require('../models/Images')
const fetchuser = require('../middleware/fetchuser')

//Upload Images
router.post('/upload', fetchuser, async (req, res) => {
    const { Image } = req.body;
        const uploadImg = await ImageSchema.create({
            user:req.user.id,
            Image: Image
        })
        if(uploadImg){
            return res.json({msg:"Image upload succesfully"})
        }
})

//Get all images
router.get('/get-all-images', fetchuser, async (req, res) => {
    try {
        const response = await ImageSchema.find({ user: req.user.id })
        res.json(response)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Somthing went wrong")
    }
})

module.exports = router; 