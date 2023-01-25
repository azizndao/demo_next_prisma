import { Tweet } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'

type ResponseData = { data: Tweet | Tweet[] } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const userId = parseInt(req.query.userId as string)

  if (req.method === 'GET') {
    const tweets = await prismaClient.tweet.findMany({
      where: { userId },
    })
    res.status(200).json({ data: tweets })
  } else if (req.method === 'POST') {
    const content = req.body.content
    const tweet = await prismaClient.tweet.create({
      data: { userId, content },
    })
    res.status(200).json({ data: tweet })
  } else {
    res.status(404).json({ message: `Method [${req.method}] not supported` })
  }
}
