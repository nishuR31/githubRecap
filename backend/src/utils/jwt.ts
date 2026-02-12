import jwt from "jsonwebtoken";

const ACCESS_EXPIRES_IN = "7d";
const REFRESH_EXPIRES_IN = "15d";

export function token(payload: any, type: "access" | "refresh" = "access") {
  const expiresIn = type === "refresh" ? REFRESH_EXPIRES_IN : ACCESS_EXPIRES_IN;
  return jwt.sign({ ...payload, type }, process.env.JWT_SECRET!, { expiresIn });
}

export function verifyAccess(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
  if (decoded.type !== "access") throw new Error("Not an access token");
  return decoded;
}

export function verifyRefresh(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
  if (decoded.type !== "refresh") throw new Error("Not a refresh token");
  return decoded;
}

export function tokens(payload: any) {
  const accessToken = sign(payload, "access");
  const refreshToken = sign(payload, "refresh");
  return { accessToken, refreshToken };
}
