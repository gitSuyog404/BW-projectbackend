import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Matching the password after the email is verified

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// pre vaneko database ma save garnu agadi yo kaam gara vaneko
// post vaneko chai database ma save vayesi yo kaam garnu vaneko

const User = mongoose.model("User", userSchema);
export default User;

// node ma jsonwebtoken vanne package install garera
// ek choti login ra signup ma web token pathauna try garne
