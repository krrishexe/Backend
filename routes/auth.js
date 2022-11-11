const express = require('express')
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Create a user using: POST "/api/auth/" .   --> is endpoint pe post request marni hai data ke liye 

// we created an array to store validations
router.post('/', [

    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5}),
    body('email').isEmail()

], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user));

    // console.log(req.body);
    // const user = User(req.body);
    // await user.save()
    // REQ.BODY --> req.body  kya hai ??
    // body of the json file we are requesting.

    // res.send(req.body)

    // obj={
    //     a:'this',
    //     number:69,
    //     name:'krish',
    // }
    // res.json([])
})
module.exports = router

//Exporting the router


// Exporting in express is always done by 'module.exports'