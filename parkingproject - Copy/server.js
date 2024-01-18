const express=require('express')
const app=express()
const parkingRouter=require('./routers/parking')
const session=require('express-session')
const mongoose=require('mongoose')
app.use(express.urlencoded({extended:false}))
  mongoose.connect('mongodb://127.0.0.1:27017/parkingproject')

app.use(session({
    secret:'lovish',
    resave:false,
    saveUninitialized:false
}))
app.use(parkingRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(5000,()=>{console.log('server is running on port 5000')})