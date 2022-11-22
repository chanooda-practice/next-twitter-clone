import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";
import db from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, ...profile } = await db.user.findUnique({
    where: { id: req.session.user?.id },
  });
  if (profile) {
    res.json({
      ok: true,
      data: profile,
    });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
