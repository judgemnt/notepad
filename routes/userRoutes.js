const express = require("express");
const router = express.Router();
const users = require("../controller/usercontroller");
const passport = require("passport");

router.route("/register")
    .get(users.registerForm)
    .post(users.registerUser)

router.route("/login")
    .get(users.loginForm)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.loginUser)

module.exports = router