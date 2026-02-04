import { randomBytes } from "crypto";
import adminRepository from "../repo/adminRepository.js";
import { accessToken } from "../../sharedService/utils/jwt.js";
import codes from "../../sharedService/utils/codes.js";
import MAIL_QUEUE, { jobTypes } from "../../sharedService/queue/queue.js";

const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const generateOtp = () => randomBytes(3).toString("hex").substring(0, 6);

const adminService = {
  async register(payload) {
    const exists = await adminRepository.findByEmail(payload.email);
    if (exists) throw createError("Admin already exists", codes.conflict);

    const admin = await adminRepository.createAdmin(payload);

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await adminRepository.setOtp(payload.email, otp, otpExpiry);

    await MAIL_QUEUE.add(jobTypes.otp, {
      to: payload.email,
      name: payload.name || payload.username,
      otp,
    });

    return { id: admin.id, email: admin.email };
  },

  async login(payload) {
    const admin = await adminRepository.verifyPassword(
      payload.email,
      payload.password,
    );

    const token = accessToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });
    await adminRepository.updateRefreshToken(admin.id, token);

    return {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
      accessToken: token,
    };
  },

  async sendOtp(email) {
    const admin = await adminRepository.findByEmail(email);
    if (!admin) throw createError("Admin not found", codes.notFound);

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await adminRepository.setOtp(email, otp, otpExpiry);

    await MAIL_QUEUE.add(jobTypes.otp, {
      to: email,
      name: admin.name || admin.username,
      otp,
    });

    return { message: "OTP sent" };
  },

  async verifyOtp(payload) {
    await adminRepository.verifyOtp(payload.email, payload.otp);
    const verified = await adminRepository.markVerified(payload.email);
    return {
      id: verified.id,
      email: verified.email,
      verified: verified.isVerified,
    };
  },

  async forgot(payload) {
    return this.sendOtp(payload.email);
  },

  async editProfile(adminId, data) {
    return adminRepository.updateProfile(adminId, data);
  },

  async deleteAdmin(adminId) {
    return adminRepository.deleteById(adminId);
  },
};

export default adminService;
