const connectToMongo = require("./db");
const express = require('express')

connectToMongo();

                                        // this below code from expressJS documentation.

const app = express()
const port = 5000
                                        // .get() ke andar jo url request marte hai usko endpoint bolte  
                    //Available Routes


app.use(express.json())     // Middleware , To use req.body , we need to use this middleware.

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/', (req, res) => {                    
//     res.send('Hello signup!')
// })       

app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})