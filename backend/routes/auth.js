const express = require("express");
const router = express.Router();
const userSchema = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const bcrypt = require("bcryptjs");

//Create a user
router.post(
  "/createuser",
  [
    body("Name", "Min lenth is 3").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be greter than 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(req.body.password, salt);
        const response = await userSchema.findOne({ email: req.body.email });
        if (!response) {
          const user = await userSchema.create({
            Name: req.body.Name,
            email: req.body.email,
            password: hashpass,
          });
          const data = {
            user: {
              id: user.id,
            },
          };
          const authtoken = jwt.sign(data, process.env.JWT_SECRET);
          console.log(authtoken);
          res.json({
            success: true,
            authtoken,
            msg: "Created account successfully",
          });
        } else {
          res.json({
            success: false,
            msg: "User already exist with this email id",
          });
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Somthing went wrong");
      }
    }
  }
);

//Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const user = await userSchema.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Please enter valid details" });
      }
      const comparepassword = await bcrypt.compare(password, user.password);
      if (!comparepassword) {
        return res
          .status(400)
          .json({ success: false, msg: "Please enter valid details" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      res.json({
        success: true,
        Name: user.Name,
        authtoken,
        msg: "Successfully logedin",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Somthing went wrong");
    }
  }
});

//get loggedin user detail login require

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await userSchema.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Somthing went wrong");
  }
});

module.exports = router;
