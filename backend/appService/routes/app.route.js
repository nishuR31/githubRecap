import express from "express";
import appPing from "../controllers/appPing.controller.js";
import adminRegister from "../controllers/adminRegister.controller.js";
import adminLogin from "../controllers/adminLogin.controller.js";
import adminLogout from "../controllers/adminLogout.controller.js";
import adminForgot from "../controllers/adminForgot.controller.js";
import adminSendOtp from "../controllers/adminSendOtp.controller.js";
import adminVerify from "../controllers/adminVerify.controller.js";
import adminEdit from "../controllers/adminEdit.controller.js";
import adminDelete from "../controllers/adminDelete.controller.js";
import contact from "../controllers/contact.controller.js";
import { APP_VERSION } from "../config/version.js";
import authMiddleware from "../../sharedService/middleware/middlewareAuth.js";

const appRouter = express.Router();

appRouter.get("/ping", appPing);
appRouter.get("/meta/version", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({ version: APP_VERSION });
});

// Admin routes only
appRouter.post("/admin/register", adminRegister);
appRouter.post("/admin/login", adminLogin);
appRouter.get("/admin/logout", authMiddleware, adminLogout);
appRouter.post("/admin/forgot", adminForgot);
appRouter.post("/admin/otp", adminSendOtp);
appRouter.post("/admin/verify", adminVerify);
appRouter.patch("/admin/edit", authMiddleware, adminEdit);
appRouter.delete("/admin/delete/:id?", authMiddleware, adminDelete);

// Contact
appRouter.post("/contact", contact);

export default appRouter;
