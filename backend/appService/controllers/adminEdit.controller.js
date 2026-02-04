import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import adminService from "../services/adminService.js";
import adminEditSchema from "../validators/adminEdit.schema.js";

const adminEdit = asyncHandler(async (req, res) => {
  const payload = await adminEditSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const result = await adminService.editProfile(req.user.id, payload);

  return success(res, "Profile updated", codes.ok, result);
});

export default adminEdit;
