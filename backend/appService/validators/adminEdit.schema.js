import Joi from "joi";

const adminEditSchema = Joi.object({
  name: Joi.string().trim().optional().allow("", null),
  contact: Joi.string().trim().optional().allow("", null),
  username: Joi.string().min(3).max(30).optional(),
});

export default adminEditSchema;
