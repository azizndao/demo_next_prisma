import { Comment } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'

export type GetPostResponse = { comments: Comment[] } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetPostResponse>
) {
  if (req.method !== 'GET') {
    return res
      .status(404)
      .json({ message: `Method [${req.method}] not supported` })
  }

  const comments = await prismaClient.comment.findMany({
    include: {
      user: {
        select: {
          id: true,
          image: true,
          email: true,
          firstName: true,
          lastName: true,
          maidenName: true,
        },
      },
    },
  })
  res.status(200).json({ comments })
}
