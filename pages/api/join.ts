import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";
import db from "../../lib/db";
import { hashPassword } from "../../lib/server/hashPassword";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email, name, password } = req.body;
  const payload = phone ? { phone } : { email };
  const { hashedPassword, salt } = await hashPassword(password);
  console.log("Salt", salt);
  const user = await db?.user.upsert({
    where: { ...payload },
    create: {
      name,
      password: hashedPassword,
      salt,
      ...payload,
    },
    update: {},
  });
  console.log(user);
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: false,
  })
);
