require('dotenv').config({path: './config/.env'})
require('colors');

const express = require('express')
const userRouter = require('./routes/userRouter')
const connectDB = require('./config/db')
const morgan = require('morgan')

const app = express()

//DB
connectDB(app)

//set engine
app.set('view engine', 'ejs')
//static
app.use(express.static("public"))
app.use(express.static("uploads"))
//middlewares
app.use(express.urlencoded({extended: false})) /* When extended is set to false, the built-in querystring library is used,
which only supports key-value pairs and does not support nested objects or arrays. */

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//  app.get('/', (req,res) => res.redirect('/users'))
app.use("/",userRouter)