const User = require("../models/userschema");


module.exports.registerForm = (req, res) => {
    res.render("user/register");
};

module.exports.registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    res.redirect("/notes");
};

module.exports.loginForm = (req, res) => {
    res.render("user/login");
};

module.exports.loginUser = (req, res) => {
    req.flash("success", "Welcome back!")
    res.redirect("/notes");
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Come back soon!")
    res.redirect("/notes");
}