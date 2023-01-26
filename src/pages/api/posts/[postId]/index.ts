import { Post } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaClient } from 'prisma/client'

type ResponseData = { post: Post | null } | { message: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res
      .status(404)
      .json({ message: `Method [${req.method}] not supported` })
  }

  const id = parseInt(req.query.postId as string)

  const post = await prismaClient.post.findUnique({
    where: { id },
    include: {
      comments: {
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
      },
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

  res.status(200).json({ post })
}
