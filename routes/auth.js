const express = require('express')
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');



// Create a user using: POST "/api/auth/" .   --> is endpoint pe post request marni hai data ke liye 



router.post('/', [

    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),       // we created an array to store validations !!
    body('email').isEmail()

], async (req, res) => {

    // if there are errors return bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ errors: "sorry a user with this email already exist" })
        }


        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);  // await kyu ? bcz it returns promise
        // Created an new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }

})
module.exports = router

//Exporting the router


// Exporting in express is always done by 'module.exports'









// .then(user => res.json(user));
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