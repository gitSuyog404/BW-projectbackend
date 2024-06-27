import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    // or let email = req.body.email
    let userExists = await User.findOne({ email: email });
    // email: email agadi ko email vaneko model ko field ko naam ho ra right ko email vaneko vakkhar banako variable ko naam ho
    // since key ra value same vako vayera yo email:email ko satta siddhai email lekhna milxa

    if (userExists) {
      let err = new Error(`${email} is already registered`);
      err.status = 400;
      throw err;
    }

    // let salt = await bcrypt.genSalt(10);
    // let hashedPassword = await bcrypt.hash(password, salt);

    // let user = await User.create({ ...req.body, password: hashedPassword });
    let user = await User.create(req.body);
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
      let err = new Error("User not registered");
      err.status = 400;
      throw err;
    }

    if (await user.matchPassword(password)) {
      const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
        expiresIn: "1hr",
      });
      res.send({ message: "Login Successful", token });
    } else {
      let err = new Error("Invalid Password");
      err.status = 400;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

export { signUp, login };
