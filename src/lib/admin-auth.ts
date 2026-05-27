import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "paxoi_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing or too short (set in .env.local)"
    );
  }
  return s;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createAdminToken(username: string) {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = `${username}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token: string | undefined | null) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [user, exp, sig] = parts;
  const payload = `${user}.${exp}`;
  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  if (Number(exp) < Date.now()) return false;
  return true;
}

export function isAdminFromCookies() {
  const token = cookies().get(COOKIE)?.value;
  return verifyAdminToken(token);
}

export function setAdminCookie(token: string) {
  cookies().set({
    name: COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearAdminCookie() {
  cookies().set({
    name: COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function checkAdminCredentials(username: string, password: string) {
  const u = process.env.ADMIN_USERNAME || "root";
  const p = process.env.ADMIN_PASSWORD || "root";
  return username === u && password === p;
}

export const ADMIN_COOKIE_NAME = COOKIE;
