const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const { signupValidation } = require("../../../validation");
const jwtTokenSecret = "UHSODJGUGIB";
const nodemailer = require("nodemailer");
const JWT_RESET_SECRET =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YWE2ODI4M2EzZDIzODMxMmUyNDkiLCJpYXQiOjE3MDg5NDAzNTksImV4cCI6MTcwODk0Mzk1OX0.mjDqvcW04wUPOV07vIlClqgMuhTLWCqJD6y7xbxgC6I";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sulemanjoseph16@gmail.com",
    pass: "qjnh tmjv pbge bjfy",
  },
});
const signup = async (req, res) => {
  try {
    const { error } = signupValidation.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    const { firstName, lastName, email, password, Referrer, Comments } =
      req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists", user: null });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      Referrer,
      Comments,
    });

    // Save user to db
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", user: null });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        user: null,
      });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong password. Please try again.",
        user: null,
      });
    }
    // JWT token
    console.log("JWT Secret:", jwtTokenSecret);
    const token = jwt.sign({ userId: user._id }, jwtTokenSecret, {
      expiresIn: "1h",
    });

    res.json({ success: true, message: "Login successful!", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", user: null });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_RESET_SECRET, {
      expiresIn: "1h",
    });

    // const resetLink = `http://localhost:3001/reset-password/${token}`;
    const resetLink = `https://stonecore.vercel.app/reset-password/${token}`;
    const mailOptions = {
      from: "suleman@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    };
    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, JWT_RESET_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const forgotUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not found" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_RESET_SECRET, {
      expiresIn: "1h",
    });

    // const resetLink = `http://localhost:3001/reset-user/${token}`;
    const resetLink = `https://stonecore.vercel.app/reset-user/${token}`;

    const mailOptions = {
      from: "sulemanjoseph16@gmail.com",
      to: email,
      subject: "User Reset",
      html: `Click <a href="${resetLink}">here</a> to reset your User.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "User reset link sent to your email",
    });
  } catch (error) {
    console.error("Forgot User error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const resetUser = async (req, res) => {
  try {
    const { token, newUsername } = req.body;

    const decoded = jwt.verify(token, JWT_RESET_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.username = newUsername;

    await user.save();

    res.json({ success: true, message: "Username reset successfully" });
  } catch (error) {
    console.error("Reset user error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  forgotUser,
  resetUser,
};
