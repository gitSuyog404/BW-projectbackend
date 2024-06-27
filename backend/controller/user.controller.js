import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";

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

export { signUp };
