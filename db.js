const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017"
const server ='127.0.0.1:27017'
const database  = 'krish';

const connectToMongo = async() =>{
    try{
        await mongoose.connect(`mongodb://${server}/${database}`)

        console.log("Connection to MongoDB Successful!!");
    }catch(err){
        console.log("failed to connect to mongodb",err);
    }
};
module.exports = connectToMongo;