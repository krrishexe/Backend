const mongoose = require('mongoose')
const { Schema } = mongoose;

const notesSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type :String,
        required : true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"../media/images/Screenshot_2020-12-26_004553.jpg"
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


module.exports = mongoose.model('Notes',notesSchema);


// Exporting in express is always done by 'module.exports'