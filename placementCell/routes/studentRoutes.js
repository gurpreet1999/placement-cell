const express = require("express");
const {
  addStudent,
  updateStudent,
  deleteStudent,
  showStudentAddPage,
  showEditStudentPage,
} = require("../controllers/studentController");

const studentRoute = express.Router();

//student route to add student

studentRoute.get("/addstudent", showStudentAddPage);
studentRoute.get("/edit/:id", showEditStudentPage);

studentRoute.post("/createstudent", addStudent);
studentRoute.post("/update/:id", updateStudent);
studentRoute.get("/delete/:studentId", deleteStudent);

module.exports = studentRoute;
