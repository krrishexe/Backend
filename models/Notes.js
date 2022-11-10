const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title:{
        type :String,
        required : true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"green",
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})

module.exports = models.Schema('Notes',notesSchema);


// Exporting in express is always done by 'module.exports'