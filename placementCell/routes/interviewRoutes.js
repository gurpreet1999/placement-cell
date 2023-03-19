const express = require("express");
const {
  addInterview,
  addStudentToInterview,
  deAllocate,
  showInterviewPage,
  deleteInterview,
} = require("../controllers/interviewController");

const interviewRoute = express.Router();
  //interview routes to schedule interview
interviewRoute.get("/addinterview", showInterviewPage);

interviewRoute.post("/createinterview", addInterview);

interviewRoute.post("/enroll/:id", addStudentToInterview);

interviewRoute.get("/delete/:studentId/:interviewId", deAllocate);
interviewRoute.get("/deleteinterview/:interviewId", deleteInterview);

module.exports = interviewRoute;
