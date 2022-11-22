import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const twit = await db.twit.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: true,
    },
  });
  const isLike = Boolean(
    await db.like.findFirst({
      where: {
        twitId: twit?.id,
        userId: user?.id,
      },
    })
  );
  res.json({
    ok: true,
    data: {
      ...twit,
      isLike,
    },
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
