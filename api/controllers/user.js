const UserSchema = require("../models/userMod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// function to capitalize first letter for name
function capitalize(str) {
  const capitalizeString = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalizeString;
}

// function to check if there are numbers in password
function containNumbers(pass) {
  return /\d/.test(pass);
}

module.exports.SIGN_UP = async (req, res) => {
  const name = req.body.name;
  const nameCapitalize = capitalize(name);

  const email = req.body.email;
  const password = req.body.password;

  if (email.includes("@") && password.length >= 6 && containNumbers(password)) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserSchema({
      name: nameCapitalize,
      email: email,
      password: hashedPassword,
      bought_tickets: [],
    });

    user.save().then(async () => {
      const user = await UserSchema.findOne({ email: req.body.email });

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        { algorythm: "RS256" }
      );

      const refreshToken = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        { algorythm: "RS256" }
      );

      return res.status(200).json({
        Message: "User registration was successfull.",
        jwt_token: token,
        jwt_refresh_token: refreshToken,
      });
    });
  } else {
    return res.status(400).json({
      Message:
        "Validation was unsuccessful. Email must contain @ and password must be at least 6 characters long with number(s). Please try again!",
    });
  }
};

module.exports.LOGIN = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordMatch) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        { algorythm: "RS256" }
      );

      const refreshToken = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        { algorythm: "RS256" }
      );

      return res.status(200).json({
        Message: "Login was successfull.",
        jwt_token: token,
        jwt_refresh_token: refreshToken,
      });
    } else {
      return res.status(404).json({
        Message: "Login was unsuccessfull. Check your email and password.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.NEW_TOKEN = (req, res) => {
  const refreshToken = req.headers.jwt_refresh_token;
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      const token = jwt.sign(
        {
          email: decoded.email,
          userId: decoded._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        { algorythm: "RS256" }
      );

      res
        .status(200)
        .json({ jwt_token: token, jwt_refresh_token: refreshToken });
    } else {
      return res.status(401).json({ Message: "Please login." });
    }
  });
};

module.exports.GET_ALL_USERS = async (req, res) => {
  try {
    const allUsers = await UserSchema.find().sort({ name: "ASC" });

    return res.status(200).json({ allUsers: allUsers });
  } catch (error) {
    console.log(error);
  }
};
