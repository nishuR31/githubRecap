import success from "../../sharedService/response/success.js";
import asyncHandler from "../../sharedService/utils/asyncHandler.js";
import codes from "../../sharedService/utils/codes.js";
import recapService from "../services/recapService.js";
import refreshSchema from "../validators/refresh.schema.js";

const adminRefresh = asyncHandler(async (req, res) => {
  const payload = await refreshSchema.validateAsync(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  // Fetch from GitHub API and save to DB
  const result = await recapService.refresh(payload, req.file);

  return success(
    res,
    `GitHub recap data for ${payload.username} (${payload.year}) refreshed successfully`,
    codes.ok,
    {
      year: result.year,
      title: result.title,
      username: payload.username,
      imageUrl: result.imageUrl,
      recordsCount: {
        repositories: result.payload?.repositories?.length || 0,
        events: result.payload?.events?.length || 0,
        commits: result.payload?.commits?.length || 0,
      },
    },
  );
});

export default adminRefresh;
