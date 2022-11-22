import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";
import db from "../../lib/db";
import { verifyPassword } from "../../lib/server/hashPassword";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email, password } = req.body;
  const payload = phone ? { phone } : { email };
  const user = await db.user.findUnique({
    where: {
      ...payload,
    },
  });
  if (user) {
    const isRightPassword = await verifyPassword(
      password,
      user?.salt,
      user?.password
    );
    if (isRightPassword) {
      console.log(user?.salt);
      req.session.user = {
        id: Number(user?.id),
      };
      await req.session.save();
      return res.json({
        ok: true,
      });
    } else {
      res.json({
        ok: false,
      });
    }
  } else {
    res.json({
      ok: false,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
