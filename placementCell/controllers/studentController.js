const INTERVIEW = require("../models/interviewModel");
const STUDENT = require("../models/studentModel");

//to show student edit page
async function showEditStudentPage(req, res) {
  const student = await STUDENT.findById(req.params.id);

  if (req.isAuthenticated()) {
    return res.render("editStudent", {
      title: "Edit Student",
      student_details: student,
    });
  }

  return res.redirect("/v1/");
}

//to show page where we can add student
async function showStudentAddPage(req, res) {
  if (req.isAuthenticated()) {
    return res.render("addStudent", {
      title: "Add Student",
    });
  }

  return res.redirect("/v1/");
}
//function to add students
async function addStudent(req, res) {
  try {
    const {
      name,
      email,
      college,
      batch,
      dsaScore,
      webScore,
      reactScore,
      placementStatus,
    } = req.body;

    let student = await STUDENT.findOne({ email: email });

    if (student) {
      req.flash("error", "Student already exist!");
      return res.redirect("back");
    }

    let newcreated = await STUDENT.create({
      name,
      email,
      college,
      batch,
      dsaScore,
      webScore,
      reactScore,
      placementStatus,
    });

    if (newcreated) {
      req.flash("success", "Student added!");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
}

//functionality to delete the student
async function deleteStudent(req, res) {
  try {
    let { studentId } = req.params;

    const student = await STUDENT.findById(studentId);

    if (!student) {
      req.flash("error", "Couldn't find student");
      return;
    }

    const interviewofStudent = student.interviews;

    /// delete reference of student from companies in which this student is enrolled

    if (interviewofStudent.length > 0) {
      for (let interview of interviewofStudent) {
        await INTERVIEW.findOneAndUpdate(
          { company: interview.company },
          {
            $pull: { students: { student: studentId } },
          }
        );
      }
    }

    student.deleteOne();
    req.flash("success", "Student deleted!");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
}


//functionality to update the student
async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    console.log(id);

    const student = await STUDENT.findById(id);

    if (!student) {
      req.flash("error", "Student does not exist!");
      return res.redirect("back");
    }

    const {
      name,
      college,
      batch,
      dsaScore,
      reactScore,
      webScore,
      placementStatus,
    } = req.body;

    student.name = name;
    student.college = college;
    student.batch = batch;
    student.dsaScore = dsaScore;
    student.reactScore = reactScore;
    student.webScore = webScore;
    student.placementStatus = placementStatus;

    student.save();
    req.flash("success", "Student updated!");
    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
}

module.exports = {
  showEditStudentPage,
  addStudent,
  deleteStudent,
  updateStudent,
  showStudentAddPage,
};
