const mongoose = require('mongoose')
const {Schema} = mongoose;

const ImageSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Image:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('Image', ImageSchema);