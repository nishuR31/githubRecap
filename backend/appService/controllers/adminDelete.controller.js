import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import adminService from "../services/adminService.js";

const adminDelete = asyncHandler(async (req, res) => {
  const adminId = req.params.id || req.user.id;

  await adminService.deleteAdmin(adminId);

  return success(res, "Admin deleted", codes.ok);
});

export default adminDelete;
