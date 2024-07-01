import User from "../models/user.model.js";
import createToken from "../utils/token.utils.js";
// import bcrypt from "bcryptjs";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../middleware/asynchandler.middleware.js";

const signUp = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    // or let email = req.body.email
    let userExists = await User.findOne({ email: email });
    // email: email agadi ko email vaneko model ko field ko naam ho ra right ko email vaneko vakkhar banako variable ko naam ho
    // since key ra value same vako vayera yo email:email ko satta siddhai email lekhna milxa

    if (userExists) {
      throw new ApiError(400, `${email} is already registered`);
      // let err = new Error(`${email} is already registered`);
      // err.status = 400;
      // throw err;
    }

    // let salt = await bcrypt.genSalt(10);
    // let hashedPassword = await bcrypt.hash(password, salt);

    // let user = await User.create({ ...req.body, password: hashedPassword });
    let user = await User.create(req.body);
    // signup garne bittikai automatic login hune ho vane chai signup mai token banaunu parxa
    // if signup garera feri login ma redirect garxa vane chai signup ma token banaunu pardaina
    createToken(res, user._id);
    res.send({
      message: "User registered successfully!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not registered");
      //   let err = new Error("User not registered");
      //   err.status = 400;
      //   throw err;
    }

    // hamile esari token use garda ni hunxa
    // arko way chai cookie ma set garne ho
    if (await user.matchPassword(password)) {
      let token = createToken(res, user._id);
      res.send({ message: "Login Successful" });
    } else {
      throw new ApiError(400, "Invalid Password");
      // let err = new Error("Invalid Password");
      // err.status = 400;
      // throw err;
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.send({ message: "Logout success" });
};

const getUsers = async (req, res) => {
  let users = await User.find({}).select("-password");
  res.send(users);
};

// const userProfile = asyncHandler(async (req, res) => {
//   try {
//     let user = await User.findById(req.user._id).select("-password");
//     if (!user) {
//       throw new ApiError(404,"User not found")
//       // let err = new Error("User not found");
//       // err.status = 404;
//       // throw err;
//     }
//     res.send(user);
//   } catch (error) {
//     next(error);
//   }
// });

// const updateProfile = async (req, res) => {
//   try{
//     let user = await User.findById(req.user._id);
//     if(!user){
//       throw new ApiError(404,"User not found")
//     //   let err = new Error("User not found");
//     //   err.status = 404;
//     //   throw err;
//     }
//   }
// };

// Sir ko code

const userProfile = asyncHandler(async (req, res) => {
  res.send(req.user);
});

const updateProfile = asyncHandler(async (req, res) => {});

export { signUp, login, logout, getUsers, userProfile };

// create a middlware to validate the token

// Assignment: updateProfile, updateUser,deleteUser
// updateProfile garda password update garna paiyo but isAdmin change garna payena
// deleteUser garne ho vane admin user chai delete hunu vayena
// updateUser garda admin le user lai update garna milyo  ani update user garda admin le password update garna mildaina but isadmin chai change garna paiyo
