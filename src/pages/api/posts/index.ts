import { Post } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '@/utils/client'

type ResponseData = { posts: Post[] } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res
      .status(404)
      .json({ message: `Method [${req.method}] not supported` })
  }

  const posts = await prismaClient.post.findMany()

  res.status(200).json({ posts })
}
