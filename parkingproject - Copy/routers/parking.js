const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const parkingc=require('../controllers/parkingcontroller')
function handlelogin(req,res,next){
if(req.session.isAuth){
    next()
}
else{
    res.redirect('/')
}
}


router.get('/',regc.loginpage)
router.get('/reg',regc.registerpage)
router.post('/reg',regc.register)
router.post('/',regc.logincheck)
router.get('/parking',handlelogin,parkingc.parkingpage)
router.get('/logout',regc.logout)
router.get('/recordadd',parkingc.parkingform)
router.post('/recordadd',parkingc.parkingadd)
router.get('/parkingupdate/:id',parkingc.parkingupdate)
router.get('/parkingprint/:id',parkingc.waytoprint)
module.exports=router