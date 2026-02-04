import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  subject: Joi.string().trim().min(3).max(120).required().messages({
    "any.required": "Subject is required",
  }),
  message: Joi.string().trim().min(10).max(2000).required().messages({
    "any.required": "Message is required",
  }),
});

export default contactSchema;
