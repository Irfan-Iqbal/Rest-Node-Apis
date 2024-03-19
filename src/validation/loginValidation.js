const Joi = require("joi")
const schema = Joi.object({
  username: Joi.string().alphanum().min(1).max(50).required().messages({
    "string.empty": "username cannot be empty",
    "string.min": "username must be between 1 and 50 characters.",
    "any.required": "username is required.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required.",
  }),
})
module.exports = schema
