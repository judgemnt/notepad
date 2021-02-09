const User = require("../models/userschema");


module.exports.registerForm = (req, res) => {
    res.render("user/register");
};

module.exports.registerUser = async (req, res) => {
    console.log(req.body)
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    res.redirect("/notes");
};

module.exports.loginForm = (req, res) => {
    res.render("user/login");
};

module.exports.loginUser = (req, res) => {
    res.redirect("/notes");
}