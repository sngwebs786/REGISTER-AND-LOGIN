const expressAsyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const User = require("../models/userModel");
// const generateToken = require("../config/generateToken");
const matchPassword = require("../models/userModel");

// SIGNUP ( REGISTER USER )

const registerUser = expressAsyncHandler(async (req, res) => {
  
  //user send the request of post and in the body there will be name,email,paswword (register form things)

  const { name, email, password, confirmpassword } = req.body; //keep everything(key of object) in separate variable .(Destrucutring)

  if (!name || !email || !password || !confirmpassword) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  // check if the user already exist

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    // return response.json().then((body) => {
    // throw new Error(body.error);
    // error.message = "Email address already exist";
    // });
    // console.log(body);
    // throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    confirmpassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      confirmpassword: user.confirmpassword,
      //   token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});



// LOGIN USER (authUser)


const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      confirmpassword: user.confirmpassword,
    //   token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };
