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
    }
}

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(err => err.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}