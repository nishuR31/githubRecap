import err from "../../sharedService/response/error.js";
import codes from "../../sharedService/utils/codes.js";

const dataAuth = (req, res, next) => {
  const authenticated = req.headers["x-authenticated"];
  const userId = req.headers["x-user-id"];

  if (authenticated === "1" && userId) {
    req.user = { id: userId };
    return next();
  }

  return err(res, "Unauthorized", codes.unauthorized);
};

export default dataAuth;
