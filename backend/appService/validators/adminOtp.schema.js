import Joi from "joi";

const adminOtpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
});

export default adminOtpSchema;
