const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{ 
    // obj={
    //     a:'this',
    //     number:69,
    //     name:'krish',
    // }
    res.json([])
})

module.exports = router                     //Exporting the router


// Exporting in express is always done by 'module.exports'