import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'
import { Post } from "@prisma/client";

type Data = { tweet: Post | null } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = parseInt(req.query.userId as string)
  const id = parseInt(req.query.postId as string)

  let tweet: Post | null = null

  if (req.method === 'GET') {
    // Get Tweet
    tweet = await prismaClient.post.findFirst({
      where: { userId, id },
    })
  } else if (req.method === 'PUSH') {
    // Update Tweet
    tweet = await prismaClient.post.update({
      where: { id },
      data: {
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
      },
    })
  } else if (req.method === 'DELETE') {
    // Get Tweet
    tweet = await prismaClient.post.delete({
      where: { id },
    })
  } else {
    res.status(404).json({ message: `Method [${req.method}] not supported` })
  }
  res.status(200).json({ tweet })
}
