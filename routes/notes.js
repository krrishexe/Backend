const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{ 
    // obj={
    //     a:'what',
    //     number:12,
    //     name:'anky',
    // }
    res.json([])
})

module.exports = router;            // exporting the router


// Exporting in express is always done by 'module.exports'