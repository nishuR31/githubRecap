import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import dataService from "../services/dataService.js";

const dataPing = asyncHandler(async (req, res) => {
  return success(res, "Data service pinged successfully", codes.ok, "Pong");
});

export default dataPing;
