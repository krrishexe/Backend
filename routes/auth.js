const express = require('express')
const router = express.Router()
const User = require('../models/User.js');



// Create a user using: POST "/api/auth/" .   --> is endpoint pe post request marni hai data ke liye 


router.get('/',(req,res)=>{ 



    console.log(req.body);
    
    const user = User(req.body);
    user.save()

    // REQ.BODY --> req.body  kya hai ??
    // body of the json file we are requesting.
                                    
    res.send(req.body) 

    // obj={
    //     a:'this',
    //     number:69,
    //     name:'krish',
    // }
    // res.json([])
})

module.exports = router             //Exporting the router


// Exporting in express is always done by 'module.exports'