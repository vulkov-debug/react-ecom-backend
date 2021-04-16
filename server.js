const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const cors = require("cors");
const {readdirSync} = require('fs')
require('dotenv').config()


const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useFindAndModify: false,
    useUnifiedTopology:true
})
.then(()=> console.log('DB Connected'))
.catch(err=> console.log(`DB CONNECTION ERROR ${err}`))

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '2mb'}))
app.use(cors())

readdirSync('./routes').map((r)=>app.use("/api", require('./routes/'+ r)))

const PORT = process.env.PORT || 8000



app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
