import { Tweet } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'

type ResponseData = { tweets: Tweet[] } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res
      .status(404)
      .json({ message: `Method [${req.method}] not supported` })
  }

  const tweets = await prismaClient.tweet.findMany()
  res.status(200).json({ tweets })
}
