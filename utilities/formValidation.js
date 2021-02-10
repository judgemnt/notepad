const Joi = require("joi");

module.exports.pageSchema = Joi.object({
    topic: Joi.string().required(),
    notes: Joi.string().required()
});

module.exports.userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})