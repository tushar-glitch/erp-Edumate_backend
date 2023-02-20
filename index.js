const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const user_route = require('./routes/user_routes')
require('dotenv').config()
app.use(cors())
app.use(express.json())
const connection_url = `mongodb+srv://tushar-glitch:${process.env.Mongo_Pass}@cluster0.fjkozqb.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', true);
mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
app.use('/user',user_route)

app.listen(5000)