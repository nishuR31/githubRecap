import { prisma } from "../prisma/client";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(user: {
  email: string;
  username: string;
  password: string;
}) {
  return prisma.user.create({ data: user });
}

export async function updateUserPassword(email: string, password: string) {
  return prisma.user.update({
    where: { email },
    data: { password, otp: null },
  });
}

export async function saveOtpForUser(email: string, otp: string) {
  // Save OTP to user record or a separate collection
  return prisma.user.update({ where: { email }, data: { otp } });
}

export async function savePasswordlessToken(email: string, token: string) {
  return prisma.user.update({
    where: { email },
    data: { passwordlessToken: token },
  });
}

export async function getUserByPasswordlessToken(token: string) {
  return prisma.user.findFirst({ where: { passwordlessToken: token } });
}

export async function updateUserById(id: string, data: any) {
  return prisma.user.update({ where: { id }, data });
}
