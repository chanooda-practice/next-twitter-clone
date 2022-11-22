import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";
import db from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { id },
    session: { user },
  } = req;
  const checkLike = await db.like.findFirst({
    where: {
      twitId: Number(id),
      userId: user?.id,
    },
  });
  if (checkLike) {
    await db.like.delete({
      where: {
        id: checkLike.id,
      },
    });
  } else {
    const like = await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        twit: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
