const express=require('express')
const indexRouter=express.Router()
const studentRoute=require('./studentRoutes.js')
const interviewRoute=require('./interviewRoutes.js')
const employerRoute=require('./employerRoutes.js')

//main route ..which controll all other routes

indexRouter.use('/',employerRoute)
indexRouter.use('/student',studentRoute)
indexRouter.use('/interview',interviewRoute)



module.exports=indexRouter