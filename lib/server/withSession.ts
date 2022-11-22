import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotSession",
  password: ";a;kjasdifwoefapo;jdc;alnvk;aejoirp23875339mv0354871v-209875v-q02348cmruwqijf90e8wfcm",
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
