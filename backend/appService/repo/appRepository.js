import appClient from "../src/prisma.js";
import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";
import codes from "../../sharedService/utils/codes.js";

const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const adminRepository = {
  // Register admin
  async registerAdmin(email, username, name, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await appClient.admin.create({
      data: {
        email,
        username,
        name,
        password: hashedPassword,
      },
    });
    return admin;
  },

  // Find admin by email
  async findAdminByEmail(email) {
    return appClient.admin.findUnique({
      where: { email },
    });
  },

  // Find admin by ID
  async findAdminById(id) {
    return appClient.admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        contact: true,
        isVerified: true,
        createdAt: true,
      },
    });
  },

  // Admin login - verify password
  async loginAdmin(email, password) {
    const admin = await this.findAdminByEmail(email);
    if (!admin) throw createError("Admin not found", codes.notFound);

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword)
      throw createError("Invalid password", codes.unauthorized);

    return admin;
  },

  // Generate OTP for admin
  async generateAdminOtp(email) {
    const otp = randomBytes(3).toString("hex").substring(0, 6);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await appClient.admin.update({
      where: { email },
      data: { otpCode: otp, otpExpiry },
    });

    return otp;
  },

  // Verify OTP for admin
  async verifyAdminOtp(email, otp) {
    const admin = await this.findAdminByEmail(email);
    if (!admin) throw createError("Admin not found", codes.notFound);
    if (admin.otpCode !== otp)
      throw createError("Invalid OTP", codes.badRequest);
    if (admin.otpExpiry < new Date())
      throw createError("OTP expired", codes.badRequest);

    return admin;
  },

  // Reset admin password
  async resetAdminPassword(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return appClient.admin.update({
      where: { email },
      data: {
        password: hashedPassword,
        otpCode: null,
        otpExpiry: null,
        isVerified: true,
      },
    });
  },

  // Update admin refresh token
  async updateAdminRefreshToken(email, refreshToken) {
    return appClient.admin.update({
      where: { email },
      data: { refreshToken },
    });
  },

  // Edit admin profile
  async editAdmin(id, data) {
    return appClient.admin.update({
      where: { id },
      data: {
        username: data.username || undefined,
        name: data.name || undefined,
        contact: data.contact || undefined,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        contact: true,
        isVerified: true,
      },
    });
  },

  // Delete admin
  async deleteAdmin(id) {
    return appClient.admin.delete({
      where: { id },
    });
  },
};

export default adminRepository;
