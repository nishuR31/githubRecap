import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import MAIL_QUEUE, { jobTypes } from "../../sharedService/queue/queue.js";
import contactSchema from "../validators/contact.schema.js";

const contact = asyncHandler(async (req, res) => {
  const payload = await contactSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  await MAIL_QUEUE.add(jobTypes.contact, {
    to: process.env.MAIL_FROM,
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
  });

  return success(
    res,
    "Thanks for reaching out. We will respond soon.",
    codes.ok,
  );
});

export default contact;
