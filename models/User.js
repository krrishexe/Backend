const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
const User =  mongoose.model('User',userSchema);
User.createIndexes();
module.exports = User;




// Exporting in express is always done by 'module.exports'