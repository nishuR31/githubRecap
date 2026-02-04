import Joi from "joi";

const refreshSchema = Joi.object({
  year: Joi.number().integer().min(1970).max(9999).required().messages({
    "number.base": "Year must be a number",
    "any.required": "Year is required",
  }),
  username: Joi.string().trim().min(1).max(39).required().messages({
    "string.empty": "GitHub username is required",
    "any.required": "GitHub username is required",
  }),
  githubToken: Joi.string().trim().min(20).required().messages({
    "string.empty": "GitHub token is required",
    "any.required": "GitHub token is required",
  }),
  title: Joi.string().trim().optional().allow("", null),
  imageUrl: Joi.string().uri().optional().allow("", null),
});

export default refreshSchema;
