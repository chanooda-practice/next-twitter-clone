import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
const cookieOptions = {
  cookieName: "twitterSession",
  password:
    ";a;kjasdifwoefapo;jdc;alnvk;aejoirp23875339mv0354871v-209875v-q02348cmruwqijf90e8wfcm",
  secure: process.env.NODE_ENV === "production",
  httpOnly: false,
  sameSite: "none",
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
