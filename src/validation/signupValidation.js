const Joi = require("joi");
const schema = Joi.object({

  // name: Joi.string().alphanum().min(1).max(50).required().messages({
  //   // ... (existing messages)
  // }),
  firstName: Joi.string().min(1).max(50).required().messages({
  }),
  lastName: Joi.string(),
  // username: Joi.string().alphanum().min(1).max(50).required().messages({
  //   // ... (existing messages)
  // }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "one"] },
    })
    .required()
    .messages({
      // ... (existing messages)
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    .messages({
      // ... (existing messages)
    }),
    Referrer: Joi.array()
    .items(Joi.string().max(50)) 
    .max(5)
    .unique() 
    .required()
    .messages({
      "array.base": "Referrer must be an array of strings.",
      "array.unique": "All Referrer entries must be unique.",
      "array.max": "Maximum of 5 Referrer entries allowed.",
    }),
  Comments: Joi.string().required().max(200).messages({
    "string.max": "Comments must not exceed 200 characters.",
    "any.required": "Comments is required.",
  }),
});

module.exports = schema;
