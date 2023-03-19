const mongoose = require("mongoose");

//interview schema

let interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    students: [
    
      {
        student: {
          //
          type: mongoose.Schema.Types.ObjectId,
          ref: "STUDENT",
        },
        result: {
          type: String,
          enum: ["Pass", "Fail", "Didn't Attempt", "On Hold"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

let INTERVIEW = mongoose.model("INTERVIEW", interviewSchema);

module.exports = INTERVIEW;
