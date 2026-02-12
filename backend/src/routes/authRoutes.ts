import { Router } from "express";
import login from "../controllers/auth/loginController";
import register from "../controllers/auth/registerController";
import forgotPassword from "../controllers/auth/forgotPasswordController";
import verifyOtp from "../controllers/auth/verifyOtpController";
import changePassword from "../controllers/auth/changePasswordController";
import passwordless from "../controllers/auth/passwordlessController";
import verifyEmail from "../controllers/auth/verifyEmailController";
import logout from "../controllers/auth/logoutController";
import authMiddleware from "../controllers/auth/authMiddleware";

const router = Router();
router.post("/login", authMiddleware, login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/change-password", changePassword);
router.post("/passwordless", passwordless);
router.post("/verify-passwordless", verifyEmail);
router.post("/logout", authMiddleware, logout);

export default router;
