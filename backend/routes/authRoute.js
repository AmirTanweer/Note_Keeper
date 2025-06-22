const express=require('express')
const router=express.Router()
const Authentication=require('../middleware/Authentication')
const {SignUp,Login,GetUserDetails}=require('../controller/authController')
//route -1 signup - No login Required
router.post('/signup',SignUp)
router.post('/login',Login)
router.get('/getdetails',Authentication,GetUserDetails)
module.exports=router