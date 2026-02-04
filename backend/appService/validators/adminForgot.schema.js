import Joi from "joi";

const adminForgotSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
});

export default adminForgotSchema;
