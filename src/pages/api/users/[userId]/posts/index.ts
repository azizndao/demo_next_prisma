import { Post } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'

type ResponseData = { data: Post | Post[] } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const userId = parseInt(req.query.userId as string)

  if (req.method === 'GET') {
    const tweets = await prismaClient.post.findMany({
      where: { userId },
    })
    res.status(200).json({ data: tweets })
  } else if (req.method === 'POST') {
    const post = await prismaClient.post.create({
      data: {
        userId: userId,
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tags,
      },
    })
    res.status(200).json({ data: post })
  } else {
    res.status(404).json({ message: `Method [${req.method}] not supported` })
  }
}
