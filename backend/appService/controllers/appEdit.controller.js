import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import appService from "../services/appService.js";

const appEdit = asyncHandler(async (req, res) => {
  const updated = await appService.editUser(req.user.id, req.body);

  return success(res, "Profile updated successfully", codes.ok, updated);
});

export default appEdit;
