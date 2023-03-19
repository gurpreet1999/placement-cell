
const mongoose = require("mongoose");
 
//student schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    dsaScore: {
      type: Number,
      required: true,
    },
    webScore: {
      type: Number,
      required: true,
    },
    reactScore: {
      type: Number,
      required: true,
    },
    placementStatus: {
      type: String,
      tolowercase:true,
      trim:true,
      enum: ["placed", "not placed"],
      required: true,
    },
    interviews: [
      {
        company: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
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

const STUDENT = mongoose.model("STUDENT", studentSchema);

module.exports = STUDENT;