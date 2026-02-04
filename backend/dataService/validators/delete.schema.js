import Joi from "joi";

const deleteSchema = Joi.object({
  year: Joi.number().integer().min(1970).max(9999).required().messages({
    "number.base": "Year must be a number",
    "any.required": "Year is required",
  }),
});

export default deleteSchema;
