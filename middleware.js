const { pageSchema, userSchema } = require("./utilities/formValidation")
const ExpressError = require("./utilities/ExpressError");
const Page = require("./models/notepadschema");
const User = require("./models/userschema");


module.exports.validateNotepad = (req, res, next) => {
    const { error } = pageSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(err => err.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    };
};

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(err => err.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    };
};

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    } else {
        next();
    };
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const note = await Page.findById(id);
    if (!note.author.equals(req.user._id)) {
        req.flash("error", "You do not own that");
        res.redirect(`/notes/${id}`);
    } else {
        next();
    };
};