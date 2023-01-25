import { Tweet } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'

type Data = { tweet: Tweet | null } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = parseInt(req.query.userId as string)
  const id = parseInt(req.query.tweetId as string)

  let tweet: Tweet | null = null

  if (req.method === 'GET') {
    // Get Tweet
    tweet = await prismaClient.tweet.findFirst({
      where: { userId, id },
    })
  } else if (req.method === 'PUSH') {
    // Update Tweet
    const content = req.body.content as string
    tweet = await prismaClient.tweet.update({
      where: { id },
      data: { content },
    })
  } else if (req.method === 'DELETE') {
    // Get Tweet
    tweet = await prismaClient.tweet.delete({
      where: { id },
    })
  } else {
    res.status(404).json({ message: `Method [${req.method}] not supported` })
  }
  res.status(200).json({ tweet })
}
