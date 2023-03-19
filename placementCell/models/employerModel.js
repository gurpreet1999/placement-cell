const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//employer schema
let employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//function to hash the passowrd before saving

employerSchema.pre("save", function (next) {
  let saltRound = 10;
  let user = this;
  let password = user.password;

  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(password, saltRound, function (err, hashed) {
    user.password = hashed;

    next();
  });
});

employerSchema.methods.comparePassword = async function (passwordSentByUser) {
  return await bcrypt.compare(passwordSentByUser, this.password);
};

let EMPLOYERMODEL = mongoose.model("EMPLOYERMODEL", employerSchema);

module.exports = EMPLOYERMODEL;
