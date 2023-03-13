require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const app = express()

//DB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, console.log(`port server running on ${PORT}`))
    })
    .catch(err => console.log(err))

//set engine
app.set('view engine', 'ejs')
//static
app.use(express.static("public"))
app.use(express.static("uploads"))
//middlewares
app.use(express.urlencoded({extended: false})) /* When extended is set to false, the built-in querystring library is used,
 which only supports key-value pairs and does not support nested objects or arrays. */
 app.use(express.json())

//  app.get('/', (req,res) => res.redirect('/users'))
app.use("/",userRouter)