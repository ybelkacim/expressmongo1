require('dotenv').config()
const express = require('express')
const app =express()
const mongoose =require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}, ()=> console.log('db conected'))
mongoose.set('strictQuery', false)
const db = mongoose.Connection

app.use(express.json())
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter )


app.listen(3000, () => console.log('server started'))