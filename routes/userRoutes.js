const express = require("express");
const router = express.Router();
const users = require("../controller/usercontroller");
const catchAsync = require("../utilities/catchAsync");
const passport = require("passport");
const { validateUser } = require("../middleware");

router.route("/register")
    .get(users.registerForm)
    .post(validateUser, catchAsync(users.registerUser))

router.route("/login")
    .get(users.loginForm)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.loginUser)

module.exports = router