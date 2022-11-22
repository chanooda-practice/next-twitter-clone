import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      body: { text },
      session: { user },
    } = req;
    const twit = await db.twit.create({
      data: {
        text,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      data: twit,
    });
  }
  if (req.method === "GET") {
    const twits = await db.twit.findMany({
      take: 20,
      include: {
        user: true,
        _count: {
          select: {
            Like: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      data: twits,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
  })
);
