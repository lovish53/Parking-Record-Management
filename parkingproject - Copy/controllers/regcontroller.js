const Reg=require('../models/reg')
const bcrypt=require('bcrypt')



exports.loginpage=(req,res)=>{
  res.render('login.ejs',{message:''})
}

exports.registerpage=(req,res)=>{
 res.render('reg.ejs',{message:``})
}

exports.register=async(req,res)=>{
  const{us,pass}=req.body
  const usercheck=await Reg.findOne({username:us})
  const passconverted=await bcrypt.hash(pass,10)
  if(usercheck==null)
  {
  const record= new Reg({username:us,password:passconverted})
  record.save()
  res.render('reg.ejs',{message:`${us} username successfully created`})
}
else{
  res.render('reg.ejs',{message:`${us} username already exists`})
}
}

exports.logincheck=async(req,res)=>{
  const{user,pass}=req.body
  const record=await Reg.findOne({username:user})
 if(record!==null){
  const passwordcompare=await bcrypt.compare(pass,record.password)
  if(passwordcompare)
  {
    req.session.isAuth=true
    req.session.loginname=user
    res.redirect('/parking')
  }
  else{
  res.render('login.ejs',{message:'Wrong Credentials'})
}
 }
 else{
  res.render('login.ejs',{message:'Wrong Credentials'})
 }
}

exports.logout=(req,res)=>{
     req.session.destroy()
     res.redirect('/')
}