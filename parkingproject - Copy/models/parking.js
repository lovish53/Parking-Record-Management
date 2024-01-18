const mongoose=require('mongoose')

const ParkingSchema=mongoose.Schema({
     Oname:String,
     Omobile:Number,
     vno:String,
     vtype:String,
     vin:Date,
     vout:Date,
     amount:Number,
     status:{type:String,default:'IN'}

})

module.exports=mongoose.model('parking',ParkingSchema)

