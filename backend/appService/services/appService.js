import appRepository from "../repo/appRepository.js";
import { accessToken } from "../../sharedService/utils/jwt.js";
import { sendMail } from "../../sharedService/mail/index.js";
import codes from "../../sharedService/utils/codes.js";

const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const appService = {
  async register(payload) {
    const userExists = await appRepository.findByEmail(payload.email);
    if (userExists) {
      throw createError("Email already registered", codes.conflict);
    }

    const user = await appRepository.register(
      payload.email,
      payload.username,
      payload.password,
    );

    // Send OTP for verification
    const otp = await appRepository.generateOtp(payload.email);
    await sendMail({
      to: payload.email,
      template: "otp",
      data: { name: payload.username || payload.email, otp },
      subject: "Email Verification OTP",
    });

    return {
      id: user.id,
      email: user.email,
    };
  },

  async login(payload) {
    const user = await appRepository.login(payload.email, payload.password);

    const token = accessToken({ id: user.id, email: user.email });

    await appRepository.updateRefreshToken(user.email, token);

    return {
      id: user.id,
      email: user.email,
      accessToken: token,
    };
  },

  async sendForgotOtp(email) {
    const user = await appRepository.findByEmail(email);
    if (!user) {
      throw createError("User not found", codes.notFound);
    }

    const otp = await appRepository.generateOtp(email);
    await sendMail({
      to: email,
      template: "otp",
      data: { name: email, otp },
      subject: "Password Reset OTP",
    });

    return { message: "OTP sent" };
  },

  async checkOtp(payload) {
    await appRepository.verifyOtp(payload.email, payload.otp);

    const tempToken = accessToken({ email: payload.email });

    return { token: tempToken };
  },

  async resetPassword(payload) {
    await appRepository.verifyOtp(payload.email, payload.otp);
    await appRepository.resetPassword(payload.email, payload.password);

    return { message: "Password reset successfully" };
  },

  async sendOtp(email) {
    const user = await appRepository.findByEmail(email);
    if (!user) {
      throw createError("User not found", codes.notFound);
    }

    const otp = await appRepository.generateOtp(email);
    await sendMail({
      to: email,
      template: "otp",
      data: { name: email, otp },
      subject: "Your OTP",
    });

    return { message: "OTP sent" };
  },

  async getMe(userId) {
    const user = await appRepository.findById(userId);
    if (!user) {
      throw createError("User not found", codes.notFound);
    }

    return user;
  },

  async editUser(userId, data) {
    const updated = await appRepository.editUser(userId, data);
    return updated;
  },
};

export default appService;
