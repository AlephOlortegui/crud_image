const mongoose = require('mongoose')

const connectDB = async (app) => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Port server running on ${PORT}`.green.underline.bold)
            console.log(`Mongo DB Connected ${conn.connection.host}`.cyan.underline.bold)
        })
    } catch (err) {
        console.log(err)
    }
 }

module.exports = connectDB