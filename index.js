const connectToMongo = require("./db");
const express = require('express')

connectToMongo();


                                    // this below code from expressJS documentation.

const app = express()
const port = 3000
app.get('/', (req, res) => {                    // .get() ke andar jo url request marte hai usko endpoint bolte  
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})