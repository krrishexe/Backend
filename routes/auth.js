const express = require('express')
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")



// Create a user using: POST "/api/auth/createuser" .   --> is endpoint pe post request marni hai data ke liye 
// NO Login Required.
const JWT_message = "hello, my name is krish";

                    // *************************** ROUTE 1 **************************

router.post('/createuser', [

    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),                      // we created an array to store validations !!
    body('email','Enter a valid E-mail').isEmail()

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





                        // ********VIP************ Copy pasted from express validator site.
                        // Creates an new user

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data ={
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,JWT_message);

        console.log(authToken);
        
        res.json({authToken})

        // res.json(user)   ---->> json file me user ko daal do.

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Error Occured");
    }

})


// Authenticate a user using: POST "/api/auth/createuser" .   --> is endpoint pe post request marni hai data ke liye 

// no login required.

                    // *************************** ROUTE 2 **************************

router.post('/login', [

    body('email','Enter a valid E-mail').isEmail(),
    body('password','Password cannot be empty').exists()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error : "Sorry the user does not exist"})
        }

        let passwordCompare = await bcrypt.compare(password,user.password)

        if(!passwordCompare){
            return res.status(400).json({error : "Sorry the user does not exist"})
        }
        const data ={
            user:{
                id:user.id
            }
        }

        const authToken = jwt.sign(data,JWT_message);      
        res.json({authToken})


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Interal Error Occured");
    }
});

                    // *************************** ROUTE 3 **************************

// Get Logged in user detail using : POST "/api/auth/getuser"   ***** LOgin Required ****

router.post('/getuser',fetchuser, async (req, res) => { 

try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
}catch (error) {
    console.log(error.message);
    res.status(500).send("Interal Error Occured");
}
})

module.exports = router;

//Exporting the router


// Exporting in express is always done by 'module.exports'

// user.save() saves the data of the user in the database .

