const Parking=require('../models/parking')

exports.parkingpage=async(req,res)=>{
    const loginname=req.session.loginname
     const record= await Parking.find()
     res.render('parking.ejs',{loginname,record})
  }

exports.parkingform=(req,res)=>{
    const loginname=req.session.loginname
    res.render('parkingform.ejs',{loginname})
}

exports.parkingadd=(req,res)=>{
    const{owname,owmobile,vno,vtype}=req.body
    const vtime=new Date()
    const record=new Parking({Oname:owname, Omobile:owmobile,vno:vno,vtype:vtype,vin:vtime,})
    record.save()
    res.redirect('/parking')
}

exports.parkingupdate=async(req,res)=>{
 const id= req.params.id
 let outTime=new Date()
  const record=await Parking.findById(id)
 let consumedTime=(outTime-record.vin)/(1000*60*60)
 let amount=null
 if(record.vtype=='2W'){
    amount=consumedTime*30
 }
 else if(record.vtype=='3W'){
    amount=consumedTime*50
 }
 else if(record.vtype=='4W'){
    amount=consumedTime*80
 }
 else if(record.vtype=='HW'){
    amount=consumedTime*120
 }
 else if(record.vtype=='LW'){
    amount=consumedTime*100
 }
 else{
    amount=consumedTime*60
 }
 await Parking.findByIdAndUpdate(id,{vout:outTime,amount: Math.round(amount),status:'OUT'})
 res.redirect('/parking')
}

exports.waytoprint=async(req,res)=>{
 const id= req.params.id
const record=await Parking.findById(id)
  res.render('printpage.ejs',{record})
}