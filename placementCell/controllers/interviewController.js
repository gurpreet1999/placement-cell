//creation of new interview

const INTERVIEW = require("../models/interviewModel");
const STUDENT = require("../models/studentModel");


//to show interview page
async function showInterviewPage(req, res) {
  if (req.isAuthenticated()) {
    return res.render("addInterview", {
      title: "Schedule An Interview",
    });
  } else {
    return res.redirect("/");
  }
}

//to add new interview
async function addInterview(req, res) {
  try {
    const { company, date } = req.body;

    let interview = await INTERVIEW.create({
      company,
      date,
    });

    if (!interview) {
      req.flash("error", "Couldn't add Interview!");
      return res.redirect("back");
    }

    req.flash("success", "Interview added!");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
}

//adding student in the interview

async function addStudentToInterview(req, res) {
  try {
    const { id } = req.params;
    const { email, result } = req.body;

    let interview = await INTERVIEW.findById(id);

    if (interview) {
      let student = await STUDENT.findOne({ email: email });

      //preventing student from enrolling in the same company again
      if (student) {
        let alreadyEnrolled = await INTERVIEW.findOne({
          students: { $elemMatch: { student: student._id } },
        });

        if (alreadyEnrolled) {
          if (alreadyEnrolled.company === interview.company) {
            req.flash(
              "error",
              `${student.name} already enrolled in ${interview.company} interview!`
            );
           return res.redirect("back")
            
          }
        }

        let studentObj = {
          student: student.id,
          result: result,
        };

        //updating students field of interview by putting reference of newly enrolled student

        await interview.updateOne({
          $push: { students: studentObj },
        });

        // updating interview of student

        let assignedInterview = {
          company: interview.company,
          date: interview.date,
          result: result,
        };
        await student.updateOne({
          $push: { interviews: assignedInterview },
        });

        req.flash(
          "success",
          `${student.name} enrolled in ${interview.company} interview!`
        );
     
      }

      req.flash("error", "Student not found!");
      return res.redirect('back')
    
    }

    req.flash("error", "interview not found!");
    return res.redirect('back')
   
  } catch (err) {
    console.log(err);
    req.flash("error", "Error in enrolling interview!");
  }
}

// deallocating students from an interview

async function deAllocate(req, res) {
  try {
    const { studentId, interviewId } = req.params;

    // find the interview

    const interview = await INTERVIEW.findById(interviewId);

    if (interview) {
      await INTERVIEW.findOneAndUpdate(
        { _id: interviewId },
        {
          $pull: { students: { student: studentId } },
        }
      );

      await STUDENT.findOneAndUpdate(
        { _id: studentId },
        {
          $pull: { interviews: { company: interview.company } },
        }
      );
      req.flash(
        "success",
        `Successfully deallocated from ${interview.company} interview!`
      );
      return res.redirect("back");
    }

    req.flash("error", "Interview not found");
  
    
  } catch (err) {
    console.log(err);
  }
}
//functionality to delete the interview

async function deleteInterview(req, res) {
  try{
    const { interviewId } = req.params;

    let interview = await INTERVIEW.findById(interviewId);
    if(!interview){
      req.flash("error", "Interview not found");
      return res.redirect("back")
    }
    var company = interview.company;
    let students = interview.students;
  
    students.forEach(async (item) => {
      let studentId = item.student.toString();
  
      await STUDENT.findByIdAndUpdate(studentId, {
        $pull: { interviews: { company: company } },
      });
    });
  
    await interview.deleteOne();
    req.flash("success",
    `Successfully deleted the interview!`);
  }
  catch(err){
console.log(err)
  }
 

  
}

module.exports = {
  addInterview,
  addStudentToInterview,
  deAllocate,
  showInterviewPage,
  deleteInterview,
};
