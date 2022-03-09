const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    }
  },
  {
    timestapms: true,
  }
);


//chcecking password for login

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// HASHING PASSWORD SIGNUP


//before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  //create a salt, the greater the salt the strong the security
  const salt = await bcrypt.genSalt(10);

  //now hashing the password

  // this.password is the password entered by the user while signing up
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmpassword = await bcrypt.hash(this.confirmpassword, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
