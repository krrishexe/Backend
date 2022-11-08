const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{     
                 // .connect() is a function which takes in two parameters a link and  a callback function.
        console.log("connected to mongoose succesfully");
    })
}
module.exports = connectToMongo;