import { getUserByEmail, savePasswordlessToken } from "../repository/userRepository";
import { sendPasswordlessEmail } from "./emailService";
import { sign } from "../utils/jwt";

export async function sendPasswordlessLinkService(email: string) {
  const user = await getUserByEmail(email);
  if (!user) return false;
  const token = sign({ id: user.id }, "access");
  await savePasswordlessToken(email, token);
  await sendPasswordlessEmail(email, token);
  return true;
}

import { getUserByEmail, updateUserPassword } from "../repository/userRepository";
import bcrypt from "bcrypt";

export async function changePasswordService(email: string, otp: string, newPassword: string) {
  const user = await getUserByEmail(email);
  if (!user || user.otp !== otp) throw new Error("Invalid OTP");
  const hash = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(email, hash);
  // Optionally clear OTP after use
  return true;
}

import { getUserByEmail, saveOtpForUser } from "../repository/userRepository";
import { sendOtpEmail } from "./emailService";

export async function forgotPasswordService(email: string) {
  const user = await getUserByEmail(email);
  if (!user) return false;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await saveOtpForUser(email, otp);
  await sendOtpEmail(email, otp);
  return true;
}

import { tokens } from "../utils/jwt";

export async function loginService(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) return null;
  const { accessToken, refreshToken } = tokens({ id: user.id });
  return { user, accessToken, refreshToken };
}

export async function registerService(email: string, username: string, password: string) {
  // Password validation logic here...
  const hash = await bcrypt.hash(password, 10);
  return createUser({ email, username, password: hash });
}

import { getUserByEmail } from "../repository/userRepository";

export async function verifyOtpService(email: string, otp: string) {
  const user = await getUserByEmail(email);
  return user && user.otp === otp;
}

import { getUserByPasswordlessToken } from "../repository/userRepository";
import { sign } from "../utils/jwt";

export async function verifyPasswordlessService(token: string) {
  const user = await getUserByPasswordlessToken(token);
  if (!user) throw new Error("Invalid token");
  const accessToken = sign({ id: user.id }, "access");
  return { user, token: accessToken };
}
