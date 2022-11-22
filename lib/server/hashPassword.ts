import crypto from "crypto";
import util from "util";

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

export async function hashPassword(password: string) {
  const buf = await randomBytesPromise(64);
  const salt = buf.toString("base64");
  const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
  const hashedPassword = key.toString("base64");
  return { hashedPassword, salt };
}

export const verifyPassword = async (password: string, userSalt: string, userPassword: string) => {
  const key = await pbkdf2Promise(password, userSalt, 104906, 64, "sha512");
  const hashedPassword = key.toString("base64");

  if (hashedPassword === userPassword) return true;
  return false;
};
