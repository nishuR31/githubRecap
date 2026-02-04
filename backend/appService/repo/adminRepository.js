import appClient from "../src/prisma.js";
import bcrypt from "bcrypt";
import codes from "../../sharedService/utils/codes.js";

const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

const adminRepository = {
  async createAdmin({ email, username, name, contact, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return appClient.admin.create({
      data: {
        email,
        username,
        name,
        contact,
        password: hashedPassword,
      },
    });
  },

  async findByEmail(email) {
    return prisma.admin.findUnique({ where: { email } });
  },

  async findById(id) {
    return prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        contact: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });
  },

  async verifyPassword(email, password) {
    const admin = await this.findByEmail(email);
    if (!admin) throw createError("Admin not found", codes.notFound);

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) throw createError("Invalid credentials", codes.unauthorized);

    return admin;
  },

  async updateRefreshToken(id, refreshToken) {
    return prisma.admin.update({
      where: { id },
      data: { refreshToken },
    });
  },

  async setOtp(email, otpCode, otpExpiry) {
    return prisma.admin.update({
      where: { email },
      data: { otpCode, otpExpiry },
    });
  },

  async verifyOtp(email, otp) {
    const admin = await this.findByEmail(email);
    if (!admin) throw createError("Admin not found", codes.notFound);
    if (admin.otpCode !== otp)
      throw createError("Invalid OTP", codes.badRequest);
    if (admin.otpExpiry && admin.otpExpiry < new Date()) {
      throw createError("OTP expired", codes.badRequest);
    }
    return admin;
  },

  async markVerified(email) {
    return prisma.admin.update({
      where: { email },
      data: { isVerified: true, otpCode: null, otpExpiry: null },
    });
  },

  async updateProfile(id, data) {
    return prisma.admin.update({
      where: { id },
      data: {
        name: data.name || undefined,
        contact: data.contact || undefined,
        username: data.username || undefined,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        contact: true,
        role: true,
        isVerified: true,
      },
    });
  },

  async deleteById(id) {
    return prisma.admin.delete({ where: { id } });
  },
};

export default adminRepository;
